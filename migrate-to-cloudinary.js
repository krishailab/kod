const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

// Load environment variables from Next.js env files
dotenv.config({ path: '.env.local' });
if (!process.env.MONGODB_URI) {
    dotenv.config({ path: '.env' });
}

const uri = process.env.MONGODB_URI;
if (!uri) {
    console.error("Error: MONGODB_URI is not set in your .env or .env.local file");
    process.exit(1);
}

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("Error: Cloudinary credentials are not fully set in .env.local");
    process.exit(1);
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function main() {
    console.log("Connecting to MongoDB...");
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log("Connected to database successfully.\n");
        
        const db = client.db("certificatesDB");
        const collection = db.collection("certificates");
        const certificates = await collection.find({}).toArray();
        
        const downloadDir = path.join(process.cwd(), 'downloaded_certificates');
        if (!fs.existsSync(downloadDir)) {
            console.error(`Directory not found: ${downloadDir}. Please run download-certs.js first.`);
            process.exit(1);
        }

        let successCount = 0;
        let failCount = 0;
        let skipCount = 0;

        console.log(`Found ${certificates.length} certificates in the database. Starting migration...\n`);

        for (const cert of certificates) {
            // Check if it's already a Cloudinary link
            if (cert.certificateLink && cert.certificateLink.includes("cloudinary.com")) {
                console.log(`⏭️  Skipping [${cert.credentialId}]: Already using Cloudinary URL.`);
                skipCount++;
                continue;
            }

            const safeName = cert.name.replace(/[^a-zA-Z0-9 ]/g, "").trim();
            const fileName = `${cert.credentialId} - ${safeName}.pdf`;
            const filePath = path.join(downloadDir, fileName);

            if (!fs.existsSync(filePath)) {
                console.log(`⚠️  Skipping [${cert.credentialId}]: Local file not found at ${fileName}`);
                failCount++;
                continue;
            }

            process.stdout.write(`Uploading ${fileName} to Cloudinary... `);
            
            try {
                // Upload to Cloudinary
                const result = await cloudinary.uploader.upload(filePath, {
                    folder: "kodrish/certificates",
                    resource_type: "auto",
                    public_id: cert.credentialId // optional: use credentialId as the public ID
                });

                const newUrl = result.secure_url;

                // Update MongoDB
                await collection.updateOne(
                    { _id: cert._id },
                    { $set: { certificateLink: newUrl } }
                );

                console.log(`✅ Success`);
                successCount++;
            } catch (err) {
                console.log(`❌ Failed`);
                console.error(`   Error details: ${err.message}`);
                failCount++;
            }
        }
        
        console.log("\n--- Migration Summary ---");
        console.log(`Total Certificates: ${certificates.length}`);
        console.log(`Successfully Migrated: ${successCount}`);
        console.log(`Already Cloudinary (Skipped): ${skipCount}`);
        console.log(`Failed/Not Found: ${failCount}`);
        
    } catch (err) {
        console.error("A fatal error occurred:", err);
    } finally {
        await client.close();
        console.log("Disconnected from MongoDB.");
    }
}

main();

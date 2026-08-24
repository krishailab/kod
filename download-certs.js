const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const https = require('https');

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

const extractDriveId = (url) => {
    const match = url.match(/[-\w]{25,}/);
    return match ? match[0] : null;
};

const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        
        const request = https.get(url, (response) => {
            // Google Drive usually redirects the direct download link
            if (response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 301) {
                https.get(response.headers.location, (res) => {
                    res.pipe(file);
                    file.on('finish', () => {
                        file.close(resolve);
                    });
                }).on('error', (err) => {
                    fs.unlink(dest, () => {});
                    reject(err);
                });
            } else if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                reject(new Error(`Server responded with ${response.statusCode}: ${response.statusMessage}`));
            }
        });

        request.on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
};

async function main() {
    console.log("Connecting to MongoDB...");
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log("Connected to database successfully.");
        
        const db = client.db("certificatesDB");
        const certificates = await db.collection("certificates").find({}).toArray();
        
        console.log(`Found ${certificates.length} certificates in the database. Starting downloads...\n`);
        
        // Create a directory to store downloaded certificates
        const downloadDir = path.join(process.cwd(), 'downloaded_certificates');
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir);
            console.log(`Created directory: ${downloadDir}`);
        }
        
        let successCount = 0;
        let failCount = 0;

        for (const cert of certificates) {
            if (!cert.certificateLink) {
                console.log(`⚠️  Skipping [${cert.credentialId}]: No certificate link found in DB.`);
                failCount++;
                continue;
            }
            
            // Format the name as "CredentialID - Name.pdf"
            const safeName = cert.name.replace(/[^a-zA-Z0-9 ]/g, "").trim();
            const fileName = `${cert.credentialId} - ${safeName}.pdf`;
            const filePath = path.join(downloadDir, fileName);
            
            // For Cloudinary, the certificateLink is the direct download URL
            const downloadUrl = cert.certificateLink;
            
            process.stdout.write(`Downloading ${fileName}... `);
            try {
                await downloadFile(downloadUrl, filePath);
                console.log(`✅ Done`);
                successCount++;
            } catch (err) {
                console.log(`❌ Failed`);
                console.error(`   Error details: ${err.message}`);
                failCount++;
            }
        }
        
        console.log("\n--- Download Summary ---");
        console.log(`Total Certificates: ${certificates.length}`);
        console.log(`Successfully Downloaded: ${successCount}`);
        console.log(`Failed/Skipped: ${failCount}`);
        console.log(`Files saved to: ${downloadDir}`);
        
    } catch (err) {
        console.error("A fatal error occurred:", err);
    } finally {
        await client.close();
        console.log("Disconnected from MongoDB.");
    }
}

main();

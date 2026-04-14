// This program file is used to push your data.json files containing a login credentials into Firestore Database
// While this is not the most secure method of auth, we use it only for testing as it is much cheaper then Firebase OAuth

const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const rawData = fs.readFileSync('data.json');
const branchData = JSON.parse(rawData);

async function syncToFirebase() {
  console.log("🚀 Starting Miracle Data Sync...");

  for (const branch of branchData) {
    try {
      const branchRef = db.collection('branches').doc(branch.bin);
      
      await branchRef.set({
        branchName: branch.branchName,
        bid: branch.bid,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp()
      });

      console.log(`📦 Processing: ${branch.branchName} (${branch.bin})`);

      const batch = db.batch();
      branch.employees.forEach(emp => {
        const empRef = branchRef.collection('employees').doc();
        batch.set(empRef, {
          name: emp.name,
          role: emp.role,
          payGrade: emp.grade,
          pin: emp.pin
        });
      });

      await batch.commit();
      console.log(`   ✔ ${branch.employees.length} employees synced.`);

    } catch (error) {
      console.error(`   ❌ Error for branch ${branch.bin}:`, error);
    }
  }
  console.log("\n✨ Database updated to Firestore.");
}


// Malviya, —I am lazy so I didn't add any documentation but the code is easy to understand
syncToFirebase();

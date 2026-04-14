# Miracle | Attendance Portal

This is an attendance management system designed for multi-branch organizations. It utilizes a secure **BID (Branch Identity Document)** and **BIN (Branch Identification Number)** authentication flow to manage personnel data across regional offices.

This project was developed for the **Hack Club "Flavortown"** challenge, focusing on building a robust, portable data pipeline from Excel spreadsheets to a live Cloud Firestore database.

---

## 🚀 Key Features
* **Dynamic Authentication**: Secure login using a 4-digit BIN for branches or a 6-digit PIN for individuals.
* **Data Sync**: Custom Python and Node.js tools to convert Excel records into structured Firestore documents.
* **Real-time IST Clock**: A custom-built clock synchronized to Indian Standard Time (Asia/Kolkata).
* **Regional Logic**: Built-in support for multiple cities (e.g., Delhi) via the BID system.

---

## 🛠️ Project Structure

| Folder/File | Purpose |
| :--- | :--- |
| `index.html` | The primary login portal. |
| `branch.html` | The branch dashboard for successful logins. |
| `tools/` | Core program files for database management. |
| ├── `convert.py` | Translates `.xlsx` employee records into structured `.json`. |
| ├── `upload.js` | A Node.js utility to push JSON data into Cloud Firestore. |
| └── `data_specimen.xlsx` | A template for formatting employee data. |

---

## ⚙️ Setup & Installation

### 1. Firebase Configuration
To run this project on your own infrastructure:
1. Create a project in the **Firebase Console**.
2. Enable **Firestore Database** and deploy the provided `firestore.rules`.
3. Copy your Web App Configuration into the `firebaseConfig` object inside `index.html`.

### 2. Populating the Database
1. Format your personnel data using the `data_specimen.xlsx` template.
2. Run the translator to generate `data.json`:
   ```bash
   python tools/convert.py

### 3. Generate a Service Account Key
    from Firebase Project Settings and save it as serviceAccountKey.json inside the tools/ folder.

### 4. Push the data live: 
    `node upload.js`

### 5. Portability
    Private Keys: `serviceAccountKey.json` is excluded via `.gitignore` and must be provided locally.
    Environment Isolation: The `.firebaserc` file is excluded to prevent project ID conflicts for external developers.
    Dependency Lock: `package-lock.json` is included to ensure version consistency across different environments.

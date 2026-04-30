# Attendance Portal

This is an attendance management system designed for multi-branch organizations. It utilizes a secure **BID (Branch Identity Document)** and **BIN (Branch Identification Number)** authentication flow to manage personnel data across regional offices.

This project was developed for the **Hack Club "Flavortown"** challenge, focusing on building a robust, portable data pipeline from Excel spreadsheets to a live Cloud Firestore database.

---

You can test the live deployment directly at: https://miraclepresently.web.app or https://pingin-presently.web.app
Test Credentials:
1. Department/Office: Search for "Example Corporation"
2. Branch ID.: HEAD
{this means for the Head Office}
3. BIN: 0001
{this takes to attendance.html, you could try entering any PIN but it won't login because the functionality wasn't developed}
4. On the branch dashboard, click an employee card and enter their 6-digit PIN to access the final camera capture screen.
Vikram- 123456
Ananya- 123457
Rahul Singh- 123458
Priya- 123459
Rahul Kumar- 123460
Arjun- 123461
Parmal- 123462

If the browser window loses focus (e.g., you click on another monitor, open a screen recorder, or press a screenshot shortcut), the UI will instantly black out to protect PII.
Simply click back into the window to restore visibility.

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
| `attendance.html` | The personnel dashboard for marking attendance with live photo and location. |
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

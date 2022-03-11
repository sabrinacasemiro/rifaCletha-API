import express from "express"
import cors from "cors"
import { google } from "googleapis"

const app = express()

app.use(cors())
app.use(express.json())

const sheetsId = "115-4uBqsltG1Arxbv8jQBesbG9FwGxBibcXGD1mR7Zg"

const auth = new google.auth.GoogleAuth({
    keyFile: 'google_sheet-keys.json',
    scopes: "https://www.googleapis.com/auth/spreadsheets"
})



app.get("/ping", (req, res) => {
    res.send('pong')
})

app.get("/list", async (req, res) => {
    const client = await auth.getClient()

    const googleSheets = google.sheets({
        version: 'v4',
        auth: client
    })

    const nameList = await googleSheets.spreadsheets.values.get({
        auth, 
        spreadsheetId: sheetsId,
        range: "A2:B101"
    })

    res.send(nameList.data.values)
})

app.listen(3333, () => {
    console.log('server up')
})


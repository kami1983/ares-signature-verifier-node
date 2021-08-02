import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {signatureVaild} from './units/signature.js'
import {insertBindRelations} from './units/db_connection.js'

// init express frame application
const app = express()

function getDateTime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}

// Make an example function to my partner.
app.get('/test', async function (req, res) {
    // Test date
    const signedMessage = "BBBB"
    const signature = "0x9a918eabef856c0b841107caab35b4f2ff40d758e42f822d290ac2a346582b2060adb59831c105ff507e1b34adedf92395a5fd07d010a40771f6617a64b5b78e"
    const publicKey = "CmzFLyhzANdDf4ZGdDM3XeFojhPMENyLZkXVQv9ePr6wrKm"

    // Test sign is vaild.
    let verify_result = await signatureVaild(signedMessage, signature, publicKey);
    console.log(verify_result)

    res.send(verify_result)
})

// Set body url encode middleware else your can not dispose post response.
app.use(express.urlencoded())
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

// Need post keys with `ksm_address`, `eth_address`, `sign_str`
app.post('/bind-eth', async function (req, res) {
    console.log(req.body)
    const signedMessage = req.body.eth_address
    const signature = req.body.sign_str
    const publicKey = req.body.ksm_address
    // console.log(publicKey,signedMessage,signature)
    // Test sign is vaild.
    let verify_result = await signatureVaild(signedMessage, signature, publicKey).catch((reason) => {
        console.log('Occur an exception.')
    });
    console.log(verify_result)
    if (true == verify_result) {
        // Record relation to database.
        // var addSqlParams = ['sign_address', 'bind_address', 'sign_str', 1, 'valid_type', '2020-01-11', '2020-01-12'];
        let addSqlParams = [publicKey, signedMessage, signature, 1 , 'KSM', getDateTime() ,getDateTime()]
        insertBindRelations(addSqlParams)
    }
    res.json(undefined == verify_result ? false : verify_result)
})

app.listen(8080)

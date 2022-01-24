var cron = require('node-cron')
const { Pool, Client } = require("pg");


 cron.schedule( '* * * * * *' ,async () =>{
    // const createTable = await DB.createTable();
    // const insertData = await DB.insertData();
    const clientResult = await DB.getdata();
    // console.log(createTable);
    console.log(insertData);
    console.log(clientResult);
})


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Developer",
  port: 5432,
});

pool.on('connect', client => {
    console.log(`${Date.now()} - Process ID : ${client.processID} - Database client connected..!`)
})
pool.on('error', err => {
    console.log(err)
})
pool.on('remove', client => {
    console.log(`${Date.now()} - Process ID : ${client.processID} - Database client has disconnected..!`)
})

class DB  {
    static async getClient() {
        return await pool.connect()
    }

    static  async  createTable() {
                return new Promise(async(resolve,reject) => {
                const client = await DB.getClient();
                client.query('create table IF NOT EXISTS sampleData (name VARCHAR (20) NOT NULL, date TIMESTAMP NOT NULL)', [], async(err,result) => {
                    if(err){
                        console.log(err)
                        reject(console.log(err))
                    } 
                     if (result && result.rows && result.rows.length > 0) {
                        let response = result.rows
                        console.log('done')
                        resolve(response)
                }
                })
            })
        }
    
        static  async  insertData() {
            console.log('called')
            return new Promise(async(resolve,reject) => {
                const client = await DB.getClient();
                client.query('insert into sampleData(name,date) values ( $1, NOW())', ['abc' + Date()], async(err,result) => {
                    if(err){
                        reject(console.log(err))
                    } 
                     if (result && result.rows && result.rows.length > 0) {
                        let response = result.rows
                        console.log('done')
                        resolve(response)
                }
                })
            })
           }

        static  async  getdata() {
            return new Promise(async(resolve, reject) =>{
                const client = await DB.getClient();
                client.query('select * from sampleData', [] ,async(err,result) =>{
                    if(err){
                                reject(console.log(err))
                            } 
                            if (result && result.rows && result.rows.length > 0) {
                                let response = result.rows
                                resolve(response)
                        }
                })
        })

        }
    }
  

  module.exports = DB;



const express=require('express')
const lodash=require('lodash')
const fs=require('fs')
const axios=require('axios')
const app=express()
app.use(express.json())
app.get('/task',async(req,res)=>{
    try{
    const api='https://catfact.ninja/breeds'
    let respData=await axios.get(api)
    let respArr=[]
    respData=respData.data
    fs.appendFile('resp.txt',JSON.stringify(respData)+'\n',err=>{
        if(err)
        throw err
        console.log('Data added')
    })
    let url=respData.first_page_url
    let ct=0
    while(url!=null)
    {
        let response=await axios.get(url)
        response=response.data
        let resAdd=response.data
        respArr.push(resAdd)
        url=response.next_page_url
        ct++
    }
    console.log('No.of pages=',ct)
    respArr=[].concat(...respArr)
    let grpData=lodash.groupBy(respArr,'country')
    res.status(200).json(grpData)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})
app.listen(5000, () => {
    console.log('Server is running on port 5000');  
});
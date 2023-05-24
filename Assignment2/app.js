const express = require('express');
const app = express();
app.use(express.json());
app.post('/countWords', (req, res) => {
  const payload = req.body.str;
  if(payload)
  {  
  // Regex pattern
  const wordRegex = /\b\w+\b/g;  
  // Count number of words 
  const wordCount = payload.match(wordRegex)?.length || 0;
  if (wordCount >= 8) {
    res.status(200).json({ message: 'OK' });
  } else 
    res.status(406).json({ message: 'Not Acceptable' });
}
else 
    res.status(400).json({message:'str not added'})
});
app.use((req,res,next)=>{
    res.status(404).json({
        error:'not found'
    })
})
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
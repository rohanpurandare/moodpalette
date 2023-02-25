const Day=require("../models/Day")
const router = require("express").Router();

// insert into db
router.post("/insertDay", async (req,res)=>{ 
  
    try{
       
        // create new day
        const newDay = new Day({
            username: req.body.username,
            color: req.body.color,
            vibes: req.body.vibes,
            journal: req.body.journal,
        });
        
                const day = await newDay.save();
                return res.status(200).json(day); // send success (200)
           
        
    }catch(err){
        //console.log(err);
        return res.status(500).json(err);
    }
   
})


  

  

 module.exports = router
function sanitize(req,res,next) 
{
    let data = req.body;
    if(data)
    {
        for (const [key, value] of Object.entries(data)) {
            if(!isValid(value.toString()))
                return res.status(400).send({message:`Invalid character in ${key}`});
        }
    }

    data = req.params;
    if(data)
    {
        for (const [key, value] of Object.entries(data)) {
            if(!isValid(value.toString()))
                return res.status(400).send({message:`Invalid character in ${key}`});
        }
    }

    data = req.query;
    if(data)
    {
        for (const [key, value] of Object.entries(data)) {
            if(!isValid(value.toString()))
                return res.status(400).send({message:`Invalid character in ${key}`});
        }
    }
    
    next();
}

function isValid(input)
{
    if(input.includes("'")) return false;
    if(input.includes('"')) return false;
    if(input.includes('<')) return false;
    if(input.includes('>')) return false;
    if(input.includes(';')) return false;
    if(input.includes('#')) return false;
    if(input.includes('$')) return false;
    if(input.includes('%')) return false;
    if(input.includes('^')) return false;
    if(input.includes('&')) return false;
    if(input.includes('*')) return false;
    if(input.includes('(')) return false;
    if(input.includes(')')) return false;
    return true;
} 

module.exports = sanitize;

const LocalStrategy = require('passport-local').Strategy
const bcrypt= require('bcrypt')

function initialize(passport,getUserEmail,getUserById){
     const authenticateUser= async (email,password,done)=>{
        const user = getUserEmail(email)
        if(user==null){
            return done(null,false,{messages : "No User with that email"})

        }

        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null,user)
            }else{
                return done(null,false,{messages : 'Incorrect Password'})
            }
        }catch(e){
            done(e)
        }

     }

     passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));

     passport.serializeUser((user,done)=> done(null,user.id))
     passport.deserializeUser((id,done)=> {
        return done(null, getUserById(id))
     })

}

module.exports= initialize
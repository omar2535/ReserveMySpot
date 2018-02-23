//Function to check if user has admin rights and render the specific page user wants
//Requires request and response object and path of hbs file as a string
var renderIfAdmin = function(req, res, webPage){
    if(req && res && req.user && req.user.isAdmin == true){           
        res.render(webPage);
    }else{
        res.send("<h1>You are NOT authorized</h1>");
    }
};


module.exports = {
    renderIfAdmin: renderIfAdmin,
};
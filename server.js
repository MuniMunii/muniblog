const express=require("express")
const next=require("next")
const dev=process.env.NODE_ENV!=='production'
const app=next({dev})
const handle=app.getRequestHandler();
app.prepare().then(()=>{
    const server=express();
    // render dynamic pages file inside pages folder
    server.get('/pages/:slug', (req, res) => {
        return app.render(req, res, `/pages/${req.params.slug}`, {
          slug: req.params.slug,
        });
      });
    //   render index
      server.get('/', (req, res) => {
        return app.render(req, res, `/pages`,);
      });
    server.all(/(.*)/,(req,res)=>{return handle(req,res)})
    server.listen(3000,()=>{console.log('http://localhost:3000')})
})

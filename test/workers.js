const { ZBClient } = require('zeebe-node')
const axios = require('axios')

const zbc = new ZBClient();

zbc.createWorker(null, "get-weather-report", async (job, complete) => {
    console.log("subprocess")
    // console.log(JSON.stringify(job, null, 2))
  try {
      const res = await axios.get(`https://webayus-gateway.herokuapp.com/product/category`)

    //   console.log(res.data[0]);
      const deleted_code = res.data[0].isDeleted;
      complete.success({
          deleted_code});
  } catch (e) {
      console.error("Something went wrong!")
      console.error(e)
      complete.fail(e.message)
  }
});

zbc.createWorker(null, "take-umbrella", (_, complete) => {
    console.log("girmemesi lazım")
    complete.success({
        recommendation: "isDeleted is true!"
    })
})

zbc.createWorker(null, "leave-umbrella", (job, complete) => {
    console.log("leave subprocess")
    // console.log(JSON.stringify(job, null, 2))
    complete.success({
        recommendation: "isDeleted is false!"
    })
})

zbc.createWorker(null, "get-weather-report2", async (job, complete) => {
    console.log("subprocess 2")
    // console.log(JSON.stringify(job, null, 2))
    const city = job.variables.city
    try {
        const res = await axios.get(`https://webayus-gateway.herokuapp.com/product/category`)
  
      //   console.log(res.data[0]);
        const deleted_code = res.data[0].isDeleted;
            complete.success({
                deleted_code
            })
    } catch (e) {
        console.error("Something went wrong!")
        console.error(e)
        complete.fail(e.message)
    }
  });

module.exports = zbc;
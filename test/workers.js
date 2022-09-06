const { ZBClient } = require('zeebe-node')
const axios = require('axios')

const zbc = new ZBClient();

zbc.createWorker(null, "get-weather-report", async (job, complete) => {
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

zbc.createWorker(null, "take-umbrella", (_, complete) => {
    complete.success({
        recommendation: "isDeleted is true!"
    })
})

zbc.createWorker(null, "leave-umbrella", (_, complete) => {
    complete.success({
        recommendation: "isDeleted is false!"
    })
})

module.exports = zbc;
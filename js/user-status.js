
db.collection("userData").get().then(res => {

    res.forEach(data => {
        console.log(data.data())
    })
})
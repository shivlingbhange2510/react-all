 const helper = {
    getData: async()=>{

        try {
            const res =  await fetch('https://jsonplaceholder.typicode.com/posts/1')
            const data = res.json()
            console.log("data us", data);
            return data

            
        } catch (error) {
            console.log("eror ", error);
        }
        // await fetch('https://jsonplaceholder.typicode.com/posts/1')
        //   .then((response) => response.json())
        //   .then((json) => {
        //     console.log("data is ", ja);
        //     // setData(json)
        // });

    },
    taskData: async()=>{

        try {
            const res =  await fetch('https://jsonplaceholder.typicode.com/posts')
            const data = res.json()
            console.log("data us", data);
            return data

            
        } catch (error) {
            console.log("eror ", error);
        }
        // await fetch('https://jsonplaceholder.typicode.com/posts/1')
        //   .then((response) => response.json())
        //   .then((json) => {
        //     console.log("data is ", ja);
        //     // setData(json)
        // });

    }
}

export default helper
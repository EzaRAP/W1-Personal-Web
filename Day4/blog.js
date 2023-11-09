let dataBlog = []

function submitBlog(event) {
    event.preventDefault()

    let inputTitle = document.getElementById("inputTitle").value
    let inputContent = document.getElementById("inputContent").value
    let inputImage = document.getElementById("inputImage").files

    console.log("title", inputTitle)
    console.log("content", inputContent)

    inputImage = URL.createObjectURL(inputImage[0])
    console.log(inputImage)

    const blog = {
        title: inputTitle,
        content: inputContent,
        image: inputImage,
        postAt: "09 November 2023",
        author: "Surya Elidanto"
    }

    dataBlog.push(blog)
    console.log("dataBlog", dataBlog)
}   
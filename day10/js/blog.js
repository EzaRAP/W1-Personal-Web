// LOOPING : FOR, WHILE, DO-WHILE

// FOR -> perulangan yang kamu sudah tau kapan harus berhenti
// for(let index = 0; index < 10; index++) { 
//     console.log("ini adalah index", index)
// }

// WHILE -> perulangan yang belum tentu kamu tau kapan harus berhenti (berdasarkan data dinamis)

// DO WHILE -> perulangan yang jalan dulu sekali, baru dicek


let dataBlog = []

function submitBlog(event) {
    event.preventDefault()

    let inputTitle = document.getElementById("inputTitle").value;
    let inputContent = document.getElementById("inputContent").value;
    let inputImage = document.getElementById("inputImage").files;
    let startDate = document.getElementById("inputStartDate").value;
    let endDate = document.getElementById("inputEndDate").value;

    let selectedImages = [];

    // Loop melalui checkbox untuk mendapatkan gambar yang dipilih
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        const imageSrc = checkbox.getAttribute('data-image');
        selectedImages.push(imageSrc);
    });

    // Menampilkan gambar yang dipilih
    console.log("Selected Images", selectedImages);

    const startMonth = new Date(startDate);
    const endMonth = new Date(endDate);
    const time = Math.abs(endMonth - startMonth);

    const distanceDay = Math.floor(time / (1000 * 60 * 60 * 24));

    let durationString;

    if (distanceDay > 365) {
        const distanceYear = Math.floor(distanceDay / 365);
        durationString = `${distanceYear} Tahun`;
    } else if (distanceDay > 30) {
        const distanceMonth = Math.floor(distanceDay / 30);
        durationString = `${distanceMonth} Bulan`;
    } else if (distanceDay > 7) {
        const distanceWeek = Math.floor(distanceDay / 7);
        durationString = `${distanceWeek} Minggu`;
    } else if (distanceDay > 0) {
        durationString = `${distanceDay} Hari`;
    } else {
        durationString = 'Baru saja';
    }

    console.log("title", inputTitle);
    console.log("content", inputContent);
    inputImage = URL.createObjectURL(inputImage[0]);
    console.log("image", inputImage);

    const blog = {
        title: inputTitle,
        content: inputContent,
        image: inputImage,
        duration: distanceDay,
        durationString: durationString,
        checkboxImage: selectedImages
    }

    dataBlog.push(blog)
    console.log("dataBlog", dataBlog)
    renderBlog();

}


function renderBlog() {
    document.getElementById("contents").innerHTML = ''
    for (let index = 0; index < dataBlog.length; index++) {
        const imagesHTML = dataBlog[index].checkboxImage.map(image => `<img style="width: 30px; height: 30px; padding-right: 10px;" src="${image}" alt="" />`).join('');

        document.getElementById("contents").innerHTML += `
        <div class="card shadow p-2 mb-5 bg-body-tertiary rounded border-0  " style="width: 17rem;">
                    <img src="${dataBlog[index].image}" class="card-img-top object-fit-cover h-100" alt="image">
                    <div class="my-3">
                        <h6 class="card-title">${dataBlog[index].title}</h6>
                        <p class="card-text"><small class="text-body-secondary">Durasi : ${dataBlog[index].durationString} </small></p>
                    </div>
                    <div class="mb-3">
                        <p class="card-text">${dataBlog[index].content}</p>
                    </div>
                    <div class="mb-3 ">
                        <p class="card-text">${imagesHTML}</p>
                    </div>
                    <div class="d-grid gap-2 d-md-block text-center">
                        <button class="btn btn-secondary" type="button">Edit Post</button>
                        <button class="btn btn-primary" type="button">Delete Post</button>
                    </div>
                </div>`
    }
}
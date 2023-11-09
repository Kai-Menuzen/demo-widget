async function overrideImageOnload() {
    const images = document.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
        const imageUrl = images[i].src;
        if (!imageUrl.startsWith('http') || imageUrl.startsWith('http://localhost')) return

        const savedImage = localStorage.getItem(imageUrl)
        console.log('savedImage', savedImage);
        if (savedImage) {
            images[i].src = savedImage;
        } else {
            const res = await fetch(imageUrl)
            if (!res.ok) return;
            const blob = await res.blob()
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
            const base64data = reader.result;
            images[i].src = base64data
            // Signagelive.setData(imageUrl, base64data, true);
            localStorage.setItem(imageUrl, base64data)
            };
        }
        //   Signagelive.getData(imageUrl, true).then(async function (savedImage) {
        //     if (savedImage) {
        //       images[i].src = savedImage;
        //     } else {
        //       const res = await fetch(imageUrl)
        //       const blob = await res.blob()
        //       console.log(blob);
        //       const reader = new FileReader();
        //       reader.readAsDataURL(blob);
        //       reader.onloadend = function () {
        //         const base64data = reader.result;
        //         images[i].src = base64data
        //         Signagelive.setData(imageUrl, base64data, true);
        //       };
        //     }
        //     });
    };
}

window.onload = function () {
    // Get all the images in the document
    var images = document.getElementsByTagName('img');

    // Iterate through each image and override the onload function
    for (var i = 0; i < images.length; i++) {
        images[i].onload = function () {
            // Your custom logic here
            console.log('Image loaded!');
        };
    }
};
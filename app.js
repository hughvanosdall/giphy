const $field = $("#field");
const $searchQuery = $("#searchQuery");

$("form").on("submit", async function (e) {
  e.preventDefault();
  try {
    let textInput = $searchQuery.val();
    $searchQuery.val("");

    let request = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        q: textInput,
        api_key: "2nkQLyFu8EuEaf3VjX48cSKksVX8Ushh",
      },
    });
    makeGif(request.data);
  } catch (error) {
    alert("Request failed!, please try again later.");
  }
});

function makeGif(request) {
  let finalNum = request.data.length;
  if (finalNum) {
    let index = Math.floor(Math.random() * finalNum);
    let $newDiv = $("<div>");
    let $newGif = $("<img>", {
      src: request.data[index].images.original.url,
    });
    $newDiv.append($newGif);
    $field.append($newDiv);
  }
}

$("#delete").on("click", function () {
  $field.empty();
});

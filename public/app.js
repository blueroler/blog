const dataContainer = document.querySelector('tbody')
    
function rerender(){
var blogname = document.getElementById('title')
var fetchedData = database.ref('blog/' + blogname.value)
fetchedData.on('value', (snapshot) => {
    var data = snapshot.val()
    // now set data in table
    var htmlData = ''
    for(var key in data){
        var value = data[key]

        if (value.thuoctinh =='img') {
          htmlData += `
          <tr>
                <td>
                  <img src='${value.imageURL}' style='height:250px;'></img>
                </td>
                <td>
                    <button id="send-button" onclick="removeMess('${key}')">Delete</button>
                </td>
            </tr>`
        }
        else if(value.thuoctinh =='link') {
          htmlData += `
          <tr>
                <td>
                <a href="https://${value.data}">liên kết này</a>
                </td>
                <td>
                    <button id="send-button" onclick="removeMess('${key}')">Delete</button>
                </td>
            </tr>`
        } else {
          htmlData += `
            <tr>
                <td>
                  <${value.thuoctinh}>${value.data}</${value.thuoctinh}>
                </td>
                <td>
                    <button id="send-button" onclick="removeMess('${key}')">Delete</button>
                </td>
            </tr>
        `
        }
    }
    dataContainer.innerHTML = htmlData
})
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function removeMess(uniqueId){
    var blogname = document.getElementById('title')
    database.ref('blog/' + blogname.value + '/' + uniqueId).remove()
}

// create a function to send data
function tieude(){
    var blogname = document.getElementById('title')
    var getdata = document.querySelectorAll('input')[1]
    var random = database.ref('blog/' + blogname.value).push()
    random.set({
        'data': getdata.value,
        'thuoctinh':'h2'})
}

function demuc(){
    var blogname = document.getElementById('title')
    var getdata = document.querySelectorAll('input')[2]
    var random = database.ref('blog/' + blogname.value).push()
    random.set({
        'data': getdata.value,
        'thuoctinh':'h3'})
}

function link(){
  var blogname = document.getElementById('title')
  var getdata = document.querySelectorAll('input')[4]
  var random = database.ref('blog/' + blogname.value).push()
  random.set({
      'data': getdata.value,
      'thuoctinh':'link'})
}

function noidung(){
  var blogname = document.getElementById('title')
  var getdata = document.querySelectorAll('textarea')[0]
  var random = database.ref('blog/' + blogname.value).push()
  random.set({
      'data': getdata.value,
      'thuoctinh':'p'})
}

function upload() {
  var blogname = document.getElementById('title')
  const image = document.getElementById('image').files[0];
  const imageName = image.name;
  const storageRef = firebase.storage().ref('images/' + imageName);
  const uploadTask = storageRef.put(image);
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    database.ref('blog/' + blogname.value).push().set(
      {
        imageURL: downloadURL,
        thuoctinh: 'img'
        },
    function(error) {
      alert("Successfully uploaded");
      document.getElementById('post-form').reset();
      });
    });
  };

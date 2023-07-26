

const catagory = document.getElementById('select-catagory');
const checkedValue = [];
const container = document.getElementById('image-container')


function selectImg() {
  const chiled = container.querySelectorAll('.relative')
  var count = 1;
  chiled.forEach(item => {
    var checkbox = item.querySelector('input[type="checkbox"]');
    // checkbox.classList.add('absolute','top-0','left-0','w-full','h-full','opacity-0', 'cursor-pointer')
    var image = item.querySelector('img');
    // image.classList.add('h-200','w-200')
    var goCheck = true;

    item.addEventListener('click', () => {

      if (checkbox.checked && goCheck) {
        // image.style.display = 'none';
        image.insertAdjacentHTML('afterend', `<h1 style="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">${count}</h1>`);
        count += 1;
        image.classList.add('opacity-50')
        checkbox.checked = goCheck;
        checkedValue.push(checkbox.value)
        // console.log('checked');
        goCheck = false;
        // console.log(checkedValue);
      }
      else if (!checkbox.checked && !goCheck && checkbox.value === checkedValue[checkedValue.length - 1]) {
        image.style.display = 'block';
        image.nextElementSibling.remove();
        count -= 1;
        image.classList.remove('opacity-50')
        checkbox.checked = goCheck;
        checkedValue.pop();
        // console.log('unchecked');
        goCheck = true;
        // console.log(checkedValue);
      }
    });
  });
}

const fetchImage = async () => {

  const value = catagory.value;
  const response = await fetch(`/user/list/${value}`)

  if (!response.ok) {
    throw new Error(`HTTP Error status: ${response.status}`)
  }

  try {
    const images = await response.json()
    container.innerHTML = ''
    images.forEach((image) => {
      container.innerHTML += `<div class="relative">
                              <input type="checkbox" value="${image.imgCode}"
                              class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer">
                              <img src="/uploads/${image.fileName}" alt="" class="h-100 w-100">
                              </div>`
    })
    selectImg()
  }
  catch (err) {
    console.error(`Error parsing response data = ${err}`)
    console.log('Response data: ', await response.text())
  }

}

if (catagory) {
  catagory.addEventListener('change', fetchImage);
}

const submit = document.getElementById('submit')
if(submit){
  submit.addEventListener('click', () => {
    const data = {
      email: document.getElementById('emailID').value,
      name: document.getElementById('nameID').value,
      number: document.getElementById('numberID').value,
      catagory: catagory.value,
      password: checkedValue
    }
  
    fetch('/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(result => {
        // console.log(result)
      })
      .catch(error => {
        console.log('Error: ', error)
      })
  })
}

function selectImgL() {
  const chiled = container.querySelectorAll('.relative')
  var count = 1;
  chiled.forEach(item => {
    var checkbox = item.querySelector('input[type="checkbox"]');
    console.log(checkbox.checked)
    var image = item.querySelector('img');
    var goCheck = true;

    item.addEventListener('click', () => {
      // console.log(checkbox.checked)
      if (checkbox.checked && goCheck) {
        // image.style.display = 'none';
        image.src = '/images/tick.jpg'
        count += 1;
        checkbox.checked = goCheck;
        checkedValue.push(checkbox.value)
        // console.log('checked');
        goCheck = false;
        // console.log(checkedValue);
      }
      else if (!checkbox.checked && !goCheck && checkbox.value === checkedValue[checkedValue.length - 1]) {
        // image.style.display = 'block';
        image.src = `/images/${checkedValue.pop()}`
        count -= 1;
        checkbox.checked = goCheck;
        // checkedValue.pop();
        // console.log('unchecked');
        goCheck = true;
        // console.log(checkedValue);
      }
    });
  });
}

var submitBtn = false
function login() {
  const id = document.getElementById('emailID')
  const message = document.getElementById('message')
  if (!submitBtn) {
    const data = {
      email: id.value
    }
    fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(async (result) => {
        if (result.notExist) {
          container.innerHTML = ''
          message.innerHTML = '<h1>User not found</h1>'
        }
        else {
          const images = await result
          message.innerHTML = ''
          container.innerHTML = ''
          images.forEach((image) => {
            message.innerHTML = '<h1>Select password :</h1>'
            container.innerHTML += `<div class="relative">
                              <input type="checkbox" value="${image.imgCode}"
                              class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer">
                              <img src="/uploads/${image.fileName}" alt="" class="h-100 w-100">
                              </div>`
          })
          submitBtn = true
          id.disabled = true
          selectImgL()
        }
      })

      .catch(error => {
        console.log('Error: ', error)
      })
  }
  else {
    const data = {
      email: id.value,
      password: checkedValue
    }
    fetch('/user/login/password', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(result => {
        // console.log(result.msg)
        // console.log(result.name)
        if (result.msg) {
          message.innerHTML = "<h1>wrong password please try again</h1>"
        }
        else {
          window.location.href = `/user/login/welcome/${result.name}`
        }
      })
      .catch(error => {
        console.log("Error: ", error)
      })
  }
}

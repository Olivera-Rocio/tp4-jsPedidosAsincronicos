window.onload = () => {
  let query = new URLSearchParams(location.search);
  let id = query.get('id');

  const $ = id => document.getElementById(id);
  var url = "http://localhost:3031/api/movies/";

  const apiCall = async (id) => {
    try {
      let response = await fetch(url + id)
      let pelicula = await response.json();

      console.log(pelicula);

      let data = pelicula.data

      $('title').value = data.title
      $('rating').value = data.rating
      $('awards').value = data.awards
      $('release_date').value = moment(data.release_date).format('YYYY-MM-DD')
      $('length').value = data.length

    } catch (error) {
      console.log(error);
    }

  };

  $('editar').addEventListener('click', () => {
    let formData = {
      title: $('title').value,
      rating: $('rating').value,
      awards: $('awards').value,
      release_date: $('release_date').value,
      length: $('length').value
    }

    let config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    fetch(url + 'update/' + id, config).then(respuesta => {
      return respuesta.json()
    }).then(info => {
      console.log(info)
      alert("La pelicula fue editada")
    }).catch(error => console.log(error))
  })

  $('crear').addEventListener('click', () => {
    let formData = {
      title: $('title').value,
      rating: $('rating').value,
      awards: $('awards').value,
      release_date: $('release_date').value,
      length: $('length').value
    }

    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    fetch(url + 'create', config).then(respuesta => {
      return respuesta.json()
    }).then(info => {
      console.log(info)
      alert("La pelicula fue guardada")
    }).catch(error => console.log(error))
  })


  $('eliminar').addEventListener('click', () => {
    let pregunta = confirm('¿Seguro que desea eliminar esta pelicula?');

    if (pregunta) {
      let config = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }

      fetch(url + 'delete/' + id, config).then(respuesta => {
        return respuesta.json()
      }).then(info => {
        console.log(info)
        alert("La pelicula fue eliminada")
      }).catch(error => console.log(error))
    }
  });

  apiCall(id);
}
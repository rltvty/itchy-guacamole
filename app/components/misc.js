const Error = () => (
  <div id='error'>
    <h2 className="text-danger text-center">An error occured! Try again!</h2>
  </div>
)

const Loading = () => (
  <div id='loading'>
    <img src='/static/images/shield.png' className='fa fa-spin'></img>
  </div>
)

exports { Error, Loading }

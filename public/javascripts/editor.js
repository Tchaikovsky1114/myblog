import Quill from 'quill';



var editor = new Quill('#editor', {
  modules: { toolbar: '#toolbar' },
  theme: 'snow'
});


console.log('this is editor')
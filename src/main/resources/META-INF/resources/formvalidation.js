$("#myform").validate({
  rules: {
    // simple rule, converted to {required:true}
    cause: {
      minlength: 2
    }
  },
  messages: {
    required: "please enter a valid cause",
    minlenght: "Enter a valid cause"
  },
  submitHandler: function(form) {
    form.submit();
  }
});


// var form = document.getElementById('myform');
// form.addEventListener('submit', function(event) {
//   // Get the start and end dates from the form
//   var startDate = new Date(document.getElementById('start-date').value);
//   var endDate = new Date(document.getElementById('end-date').value);

//   // Compare the start and end dates
//   if (endDate.getTime() > startDate.getTime()) {
//     // If the end date is greater than the start date, prevent the form from being submitted
//     event.preventDefault();
//     // Display an error message to the user
//     alert('The end date cannot be greater than the start date');
//   }
// });



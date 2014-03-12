<h2>jQuery plugin to validate forms in a simple way</h2>

<br/><br/>
<a href="http://jsfiddle.net/aesposito/y3E3H/">Demo in jsdiffle.net</a>

<br/><br/>
<strong>HTML</strong>
<br/><br/>
```html
<form id="myform">
    Valid max length 4
	<input type="text" data-validation-maxlength="4"/>

	Valid required field
	<input type="text" data-validation-required="true"/>

	<input type="button" value="Submit" id="submit"/> 
</form>
```

<br/><br/>
<strong>JS</strong>
<br/><br/>

```html
$('#submit').click(function(e){

	var valid = $("#myform").validateForm();
	if (valid.success)
	{
		//Ok form
	}	
	else
	{
		//List of errors
		//valid.inputs_error

		//Field
		//valid.inputs_error[index].field
		//this contains a jQuery element as $('#input')
		//Example: 
		//valid.inputs_error[index].field.css('background-color', 'red');

		//Detail errors list
		//valid.inputs_error[index].errors
		//valid.inputs_error[index].errors[index]
		//Example:
		//alert(valid.inputs_error[index].errors[0]); //required
	}

});
```

<br/><br/>
<strong>Examples:</strong>
<br/><br/>

```html
<input type="text" data-validation-maxlength="4"/>
<input type="text" data-validation-minlength="2"/>
<input type="text" data-validation-mail="true"/>
<input type="text" data-validation-required="true"/>
<input type="text" data-validation-onlynumbers="true"/>
<input type="text" data-validation-onlycharacters="true"/>
<input type="text" data-validation-url="true"/>
<input type="text" data-validation-different="hello,bye" data-validation-different-casesensitive="true"/>

<!-- Combining validation -->
<input type="text" data-validation-minlength="2" data-validation-maxlength="4"/>
<input type="text" data-validation-mail="true" data-validation-required="true"/>
<input type="text" data-validation-onlycharacters="true" data-validation-maxlength="9" data-validation-required="true"/>
```


<br/><br/>
<strong>Validators</strong>
<br/><br/>

* Max length
* Min length
* Mail format
* Required field
* Only numbers
* Only characters
* Url format
* Different strings

<br/><br/>
<h2>Changelog</h2>
<br/>
#### 1.0<br/><br/>
* Add all validators
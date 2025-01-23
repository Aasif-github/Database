Topics:

1. https://developer.mozilla.org/en-US/docs/Learn/JavaScript

# To learn Modern Js: https://learnjavascript.online/
# How To: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Howto

What is Just-In-Time compiler in JS?

You might hear the terms interpreted and compiled in the context of programming. In interpreted languages, the code is run from top to bottom and the result of running the code is immediately returned. You don't have to transform the code into a different form before the browser runs it. The code is received in its programmer-friendly text form and processed directly from that.

Compiled languages on the other hand are transformed (compiled) into another form before they are run by the computer. For example, C/C++ are compiled into machine code that is then run by the computer. The program is executed from a binary format, which was generated from the original program source code.

JavaScript is a lightweight interpreted programming language. The web browser receives the JavaScript code in its original text form and runs the script from that. From a technical standpoint, most modern JavaScript interpreters actually use a technique called just-in-time compiling to improve performance; the JavaScript source code gets compiled into a faster, binary format while the script is being used, so that it can be run as quickly as possible. However, JavaScript is still considered an interpreted language, since the compilation is handled at run time, rather than ahead of time.

There are advantages to both types of language, but we won't discuss them right now.

# Script loading strategies
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript#script_loading_strategies

<script src="script.js" defer></script>
An old-fashioned solution to this problem used to be to put your script element right at the bottom of the body (e.g. just before the </body> tag), so that it would load after all the HTML has been parsed. The problem with this solution is that loading/parsing of the script is completely blocked until the HTML DOM has been loaded. On larger sites with lots of JavaScript, this can cause a major performance issue, slowing down your site.

async and defer
There are actually two modern features we can use to bypass the problem of the blocking script — async and defer (which we saw above). Let's look at the difference between these two.

Scripts loaded using the async attribute will download the script without blocking the page while the script is being fetched. However, once the download is complete, the script will execute, which blocks the page from rendering. You get no guarantee that scripts will run in any specific order. It is best to use async when the scripts in the page run independently from each other and depend on no other script on the page.

Scripts loaded with the defer attribute will load in the order they appear on the page. They won't run until the page content has all loaded, which is useful if your scripts depend on the DOM being in place (e.g. they modify one or more elements on the page).

Here is a visual representation of the different script loading methods and what that means for your page:



============================================================
1. https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript#script_loading_strategies
2. https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash

============================================================

# Best resources
https://github.com/topics/nodejs
https://github.com/leonardomso/33-js-concepts

best resources – Blog
https://medium.com/@gaurav.pandvia/understanding-javascript-function-executions-tasks-event-loop-call-stack-more-part-1-5683dea1f5ec

#Execution-context
https://medium.com/@valentinog/javascript-what-is-the-execution-context-what-is-the-call-stack-bd23c78f10d1


function foo(b){
    var a = 5;
    return a * b +10;
}

function bar(x){
    var y = 3;
    
    return foo(x*y)
}

console.log(bar(6));

stack
-------
foo(18)
bar(6)
console()
main()

# Rate Limiting –
Rate limiting is the process of limiting access for people (and bots) to access the API based on the rules/policies set by the API's operator or owner. We can think of rate limiting as a form of both security and quality control. This is why rate limiting is integral for any API product's growth and scalability

# Corn-Job - 
Cron Jobs: These are the tasks that run periodically by the operating system. Users can schedule commands the OS will run these commands automatically according to the given time. It is usually used for system admin jobs such as backups, logging, sending newsletters, subscription emails and more.

https://www.geeksforgeeks.org/how-to-run-cron-jobs-in-node-js/

https://themewagon.com/themes/free-hotel-website-template-luxury-hotel/

https://mobirise.com/html-templates/hotel/

# Primitive data-type and Non-primitive data-type
1. Number
2. String
3. BigInt = 2^53-1
4. Symbol = let sym = new Symbol(‘sss’);
5. Boolean
6. Undefined
7. Null : Represents the absence of any object value.

Non-Primitive 
The data types that are derived from primitive data types of the JavaScript language are known as non-primitive data types. It is also known as derived data types or reference data types.
1. Object
2. Array

Primitive values are immutable, which means their values cannot be changed once they are created. When you perform operations on primitive values, you are working with the value itself, not a reference to an object. This is in contrast to objects, which are mutable and can have methods and properties.

https://blog.bitsrc.io/understanding-javascript-async-and-await-with-examples-a010b03926ea


# Hand written note – js
# same as doc file in cloud
	learn 40% revision-60%
Jan 05 24
MDN – about callback- what if a first function takes too much of time,it block next function and rest, so we use callback to avoid it.

Javascript.info - 

function loadScript(src){
	let script = document.createElement(‘script’);
	script.src = src;
	document.head.append(script);
}

using callback (when there is a function which execute after loading script)

function loadScript(src, callback){
	let script = document.createElement(‘script’);
	script.src = src;

	script.onload() = () => callback(script);

	document.head.append(script);
}
Now if we want to call new functions from the script, we should write that in the callback:

loadScript(‘/path/myscript.js’, (script) =>{
	
	alert(‘script is loaded’);	
	my_new_function();
})

#loading 2 scripts

loadScript(‘/path/script1.js’, function(script){
	alert(‘script 1 loaded’);

	loadScript(‘/path/script2.js’, function(script){
		alert(‘script 2 loaded’);
	})
})

#What if script loading will fail, Error handling

function loadScript(src, callback){
	let script = document.createElement(‘script’);
	script.src = src;
	
	script.onload = () => callback(null, src);
	script.onerror = () => callback(new Error(`Script load error for ${src}`));
	document.head.append(script);
}

- nexted callback --------- seperate style of code
- Pyramid of doom or callback hell

To solve this ‘Promise’ came;
============================================


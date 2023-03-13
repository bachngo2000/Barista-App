import React, {Component, useState} from "react";
import RecipeChoices from "./recipeChoices";
import drinksJson from "./drinks.json"


const BaristaForm = () => {
    // We will need some state variables to keep track of the user choices so that we can compare them against the correct answers.
    // create one state variable using useState() to handle all of the controlled inputs 
    // for our four basic ingredient categories, temperature, milk, syrup, and blended.
    const [inputs, setInputs] = useState({
        'temperature': '',
        'milk': '',
        'syrup': '',
        'blended': '' 
    })

    // now that we can store what choices the user makes using the state variable 'inputs', we need to give them a list of options presented to the user
    const ingredients = {
        'temperature' : ['hot', 'lukewarm', 'cold'],
  
        'syrup': ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
      
        'milk': ['cow', 'oat', 'goat', 'almond', 'none'],
      
        'blended': ['yes', 'turbo', 'no']  
    }

    // A few state variables to keep track of what drink we have currently and what the true recipe is behind that drink using useState()
    const [currentDrink, setCurrentDrink] = useState('');
  
    const [trueRecipe, setTrueRecipe] = useState({});

    // Now, we will be adding functionality that checks the user choices in our form and compares them with the real recipe when we click the Check Answer button. 
    // We will also create a way for an ID to be placed on the answer-space when a user has the wrong answer for an ingredient.
    // Add more state variables to represent whether we have a correct ingredient, and we can do this with just simple strings. 
    // To make this clearer, we can make a different state variable for the correctness of each ingredient.
    const [correct_temp, setCheckedTemperature] = useState('');
    const [correct_syrup, setCheckedSyrup] = useState('');
    const [correct_milk, setCheckedMilk] = useState('');
    const [correct_blended, setCheckedBlended] = useState('');

    const onCheckAnswer = () => {

        if (trueRecipe.temp != inputs['temperature']){
            setCheckedTemperature('wrong');
        }
          else {
            setCheckedTemperature("correct");
          }

        if (trueRecipe.syrup != inputs['syrup']){
            setCheckedSyrup('wrong');
        }
          else {
            setCheckedSyrup("correct");
          }

        if (trueRecipe.milk != inputs['milk']){
            setCheckedMilk('wrong');
        }
          else {
            setCheckedMilk("correct");
          }

        if (trueRecipe.blended != inputs['blended']){
            setCheckedBlended('wrong');
        }
          else {
            setCheckedBlended("correct");
          }
    };

    // When we request a new drink, we want to clear out the current values of our state variables since they apply only to the previous drink and that will deselect 
    // whatever radio buttons the user has chosen. And then we want to get another randomly chosen drink from our drinksJson file.
    // Back in n our onNewDrink() function, we want to set our state variable for our ingredients to be empty, and then call getNextDrink().
    // We also need to reset the state variables that represent whether we have a correct ingredient when we order a new drink so that a user's errors on one drink do not carry over to other's
    const onNewDrink = () => {
        setInputs({
            'temperature': '',
            'milk': '',
            'syrup': '',
            'blended': '' });
            
          getNextDrink();

          setCheckedTemperature('');
          setCheckedSyrup('');
          setCheckedMilk('');
          setCheckedBlended('');
    };

    // A new function just for selecting another random drink. 
    // Within this function we want to use some math packages to get a random number from 0 to the numerical length of the drinks list in our drinksJson, and then once 
    // we have that, index into our drinks list in our json and get the name and ingredients associated with that drink and set them to our state variables 
    // currentDrink and trueRecipe
    const getNextDrink = () => {
        let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);

        setCurrentDrink(drinksJson.drinks[randomDrinkIndex].name);
        setTrueRecipe(drinksJson.drinks[randomDrinkIndex].ingredients);
    
    }

    // For the  New Drinks button and the Check Answer button, we need to use the onClick event handler in both buttons so that they will respond properly when we click them
    // We will use our RecipeChoices component to add actual questions and answers to our form.
    // For each of our 4 ingredients, temperature, milk, syrup, and blended, we will create a small title for that ingredient using <h3> tags, 
    // add an answer space <div> with a reference to the state variable of that ingredient so that the user selection is displayed above the form choices, and then 
    // a RecipeChoices component with real values for all of the props {handleChange, label, choices, checked} that we pass into that component.
    // Lastly, we need to make it possible to visually change our answer spaces when we check the answers by adding our correct_* state variables as IDs in the answer-space divs. 
    // This will allow us to make different CSS selectors for the #correct and #wrong IDs to trigger a visual change. To do this, add the snippet below to each <div className="answer-space" > for each ingredient: id={correct_temp}
    return(
        <div>
            <h2> Hi, I'd like to order a: </h2>

            <div className="drink-container">
                <h2 className="mini-header">{currentDrink}</h2>
                <button
                    type="new-drink-button"
                    className="button newdrink"
                    onClick={onNewDrink}
                >
                    Give me a New Drink
                </button>
            </div>

            <form className="container">
                <div className="mini-container">
                    <h3> Temperature </h3>
                    <div className="answer-space" id={correct_temp}>
                        {inputs["temperature"]}
                    </div>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                            ...prevState, 
                            [e.target.name]: e.target.value,
                        }))}
                        label="temperature"
                        choices={ingredients["temperature"]}
                        checked={inputs["temperature"]}
                    />
                </div>
                
                <div className="mini-container">
                    <h3> Milk </h3>
                    <div className="answer-space" id={correct_milk}>
                        {inputs["milk"]}
                    </div>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                            ...prevState, 
                            [e.target.name]: e.target.value,
                        }))}
                        label="milk"
                        choices={ingredients["milk"]}
                        checked={inputs["milk"]}
                    />
                </div>

                <div className="mini-container">
                    <h3> Syrup </h3>
                    <div className="answer-space" id={correct_syrup}>
                        {inputs["syrup"]}
                    </div>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                            ...prevState, 
                            [e.target.name]: e.target.value,
                        }))}
                        label="syrup"
                        choices={ingredients["syrup"]}
                        checked={inputs["syrup"]}
                    />
                </div>

                <div className="mini-container">
                    <h3> Blended </h3>
                    <div className="answer-space" id={correct_blended}>
                        {inputs["blended"]}
                    </div>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                            ...prevState, 
                            [e.target.name]: e.target.value,
                        }))}
                        label="blended"
                        choices={ingredients["blended"]}
                        checked={inputs["blended"]}
                    />
                </div>
            </form>    
            
            <button type="submit" className="button submit" onClick={onCheckAnswer}>
                Check Answer
            </button>

            <button type="submit" className="button newdrink" onClick={onNewDrink}>
                New Drink
            </button>
            
        </div>
    );
};

export default BaristaForm;
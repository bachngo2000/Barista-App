import React, { Component, useEffect, useState } from "react";

// A component to take in our ingredients dictionary and set up different blocks of answer choices for each list in ingredients for the user to select
// This component will be used to make different inputs via radio buttons, so we need to pass in the different answer choices to the radio buttons as props. 
// We also need to save the user's selections from this nested component (the radio buttons) back in our parent component BaristaForm (as state). 
// Because we are passing in a list of choices to be displayed as radio buttons, we can use .map() to map through the ingredients dictionary to match each choice (hot, lukewarm, cold, mocha, cow, yes...) with a radio button.
// The RecipeChoices component uses four props, representing:
//      1. handleChange: How we will handle Change when different inputs are selected (so that the selections get saved within the BaristaForm component's state)
//      2. label: describing the correspdong ingredient (e.g. "milk")
//      3. choices: list of answers
//      4. checked: a variable that deselects the user's choices when they request a new drink
// So we loop through each of the choices (if the list is populated) and then create a list item that represents one radio button input.
// input categories:
//  1.  "id" and "value" keep track of what our form is recognizing as our choice.
//  2.  "name" groups input buttons together so that the app recognizes they are all answers to the same question. The "name" attribute is what enforces radio buttons 
//      as mutually exclusive, so that when one is selected, any others with the same "name" will be deselected.
//  3.  "onChange" will let the form know what to do when the user selects a choice
//  4.  "checked" keeps track of whether the radio button will be selected or deselected.
// Everything in the {} is what we will pass in from our parent component, BaristaForm

const RecipeChoices = ( {handleChange, label, choices, checked} ) => {
    return (
            <div className="radio-buttons">
                {choices && choices.map((choice) => (
                    <li key={choice}>
                        <input
                            id={choice}
                            value={choice}
                            name={label}
                            type="radio"
                            onChange={handleChange}
                            checked={checked == choice}
                        />
                        {choice}
                    </li>
                ))}
            </div>
    );
};

export default RecipeChoices;
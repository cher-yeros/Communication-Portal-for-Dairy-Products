import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "./Auth";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import api from "../client";

function GetInformation() {
  const [chatBots, setChatBots] = useState([]);

  useEffect(() => {
    fetchChatbots();
  }, []);

  function fetchChatbots() {
    api.get("/admin/get-wcb").then(({ data }) => {
      setChatBots(data);
      console.log(chatBots);
    });
  }
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <div className="row d-flex justify-content-center">
          <div className=" col-sm-12  d-flex justify-content-center">
            <ChatBot
              steps={[
                {
                  id: `1`,
                  message: `Safety of milk and milk product `,
                  trigger: `2`,
                },
                {
                  id: `2`,
                  options: [
                    { value: 1, label: `milk`, trigger: `3` },
                    { value: 2, label: `butter`, trigger: `4` },
                    { value: 3, label: `yoguert`, trigger: `5` },
                    { value: 4, label: `cheese`, triger: `6` },
                  ],
                },
                {
                  id: `3`,
                  message: `

All fresh fluid milks should be stored at temperatures below 40 °Fand should not be stacked high in the display cases. 
If stored above 40 °F, milk will begin to develop signs of spoilage, 
including sour odor, off-flavor and curdled consistency. 
`,
                  trigger: `7`,
                },
                {
                  id: `7`,
                  options: [
                    {
                      value: 1,
                      label: ` How to identify  pure milk :`,
                      trigger: `8`,
                    },
                    {
                      value: 2,
                      label: `   milk nutritional value: `,
                      trigger: `9`,
                    },
                    {
                      value: 3,
                      label: `  How Mach milk should you drink a day `,
                      trigger: `10`,
                    },
                  ],
                },
                {
                  id: `8`,
                  message: `Milk slip test : Put a drop of milk on a polished vertical surface. If it stops or flows slowly, leaving a white trail behind, it is pure milk
        Purity test: Boil milk on slow heat for 2-3 hours until it solidifies and become onerous (khoya). Rock solid, rough residue means the milk is adulterated while oily residue means it is of good quality.
        Checking for Synthetic Milk: Synthetic milk is created by combining chemicals and things like soap in natural milk. Synthetic milk can be simply known by bad taste. It feels soapy when rubbed and turns yellowish when heated.
        Water in milk: Water in milk might not be dangerous for your health however expensive for your pocket. To check, put a drop of milk on your paw or any slanted surface and let it flow down. If the milk leaves a path behind, it’s not pure else its good.
             `,
                  //  trigger: `11`,
                  trigger: "7",
                },
                {
                  id: `9`,
                  message: `Whole Milk It has 149 calories and about 7.9 g fat
            and 4.6 g of saturated fat. Whole milk contains 7.7
            g protein and 11.7 g of carbohydrates. Whole milk as
            0 fiber content and 28% of DV calcium. It contains 8% DV
            vitamin A and about 31% DV of vitamin D
            `,
                  //  trigger: `12`,
                  trigger: "1",
                },

                {
                  id: `10`,
                  message: `  Milk consumption is recommended by many nutritional 
                guidelines for meeting daily requirements for calcium,
                 animal proteins and vitamin B12 intake. In the United-States,
                 the national dietary guidelines recommend that adults
                 should drink three cups or 732 mL/d of milk
                  
                `,
                  trigger: `13`,
                },

                {
                  id: `4`,
                  message: `


    Butter is best kept refrigerated at 4˚C, protected from light
 and sealed in its original container or wrapping until it is 
used as it readily absorbs odors from other foods. Butter will keep
 refrigerated for up to eight weeks, but it is best purchased when required rather than stored.
When the Get  more information is click: `,

                  //  trigger: `18`,
                  trigger: "1",
                },

                {
                  id: `14`,
                  options: [
                    {
                      value: 1,
                      label: `           
        How to identify  pure butter:
             `,
                      trigger: `15`,
                    },

                    {
                      value: 2,
                      label: `  
        butter nutritional value:
                   `,
                      trigger: `16`,
                    },
                    {
                      value: 3,
                      label: `  How Mach butter should you shoud take a day    `,
                      //  trigger: `17`,
                      trigger: "1",
                    },
                  ],
                },

                {
                  id: `15`,
                  message: `
            
            
            The simplest method to check the purity of butter is to heat a teaspoon of butter in a vessel.
           If butter melts immediately and turns dark brownish in color. then it is pure

            
            
            `,
                  //  trigger: `20`,
                  trigger: "1",
                },

                {
                  id: `16`,
                  message: `One tablespoon of unsalted butter contains: 102 calories. 
                12 grams of fat. 0 grams of carbohydrates, fiber, sugar, and protein.`,

                  //  trigger: `21`,
                  trigger: "1",
                },

                {
                  id: `10`,
                  message: `
                    
                    
                    It\`s best to stick to 1–2 tablespoons (14–28 grams) per day, 
                    combined with other healthy fats like olive oil, nuts, seeds, 
                    coconut oil, avocados, and fatty fish. 
                    Enjoying butter in moderation may be linked to a lower risk of obesity, diabetes,
                     and heart problems
                    
                    `,
                  //  trigger: `22`,
                  trigger: "1",
                },

                {
                  id: `5`,
                  message: `
        
    Yogurt has a shelf life of seven to 14 days and should be stored
 in the refrigerator in its original, sealed container. 
Spoon a portion into a bowl if the whole carton isn\`t going to be eaten at once. 
Do not leave yogurt at room temperature for more than two hours.

  


        `,
                  trigger: `7`,
                },

                {
                  id: `7`,
                  options: [
                    {
                      value: 1,
                      label: `           
            How to identify  pure milk :
                 `,
                      trigger: `23`,
                    },

                    {
                      value: 2,
                      label: `  
            milk nutritional value:
                       `,
                      trigger: `24`,
                    },
                    {
                      value: 3,
                      label: `  How Mach milk should you drink a day    `,
                      trigger: `25`,
                    },
                  ],
                },

                {
                  id: `23`,
                  message: `
                
                Reading the label is the first thing you should do when 
choosing a yogurt. The nutrition facts and ingredients list 
can tell you a lot about what’s in your yogurt.

               
  
                
                `,
                  //  trigger: `26`,
                  trigger: "1",
                },

                {
                  id: `24`,
                  message: `
                    
                    Yogurt contains some of nearly every nutrient that your body needs.
                    It’s known for containing a lot of calcium, a mineral necessary
                     for healthy teeth and bones. Just one cup provides 49% of your daily calcium needs 
                    It’s also high in B vitamins, particularly vitamin B12 and riboflavin, 
                    both of which may protect against heart disease and certain neural tube birth defects 
                    One cup also provides 28% of your daily phosphorus, 10% for magnesium, 
                    and 12% for potassium. These minerals are essential for several biological processes, 
                    such as regulating blood pressure, metabolism, and bone health  
                    One nutrient that yogurt does not contain naturally is vitamin D, 
                    but it’s commonly fortified with it. Vitamin D promotes bone and immune system health and may reduce the risk of some diseases, including heart disease and depression. 
                         
        
                      
                    
                    `,
                  //  trigger: `27`,
                  trigger: "1",
                },

                {
                  id: `25`,
                  message: `
                        
    
            It\`s safe and healthy to eat up to 3 cups of unsweetened nonfat or low-fat yogurt every day.
                     
            
                                
                        `,
                  //  trigger: `28`,
                  trigger: "1",
                },

                {
                  id: `6`,
                  message: `
            
            
            
            All fresh fluid milks should be stored at temperatures below 40 °Fand should not be stacked high in the display cases. 
            If stored above 40 °F, milk will begin to develop signs of spoilage, 
            including sour odor, off-flavor and curdled consistency. 
            
            `,
                  trigger: `29`,
                },

                {
                  id: `29`,
                  options: [
                    {
                      value: 1,
                      label: `           
                How to identify  pure milk :
                     `,
                      trigger: `30`,
                    },

                    {
                      value: 2,
                      label: `  
                milk nutritional value:
                           `,
                      trigger: `31`,
                    },
                    {
                      value: 3,
                      label: `  How Mach milk should you drink a day    `,
                      //  trigger: `32`,
                      trigger: "1",
                    },
                  ],
                },

                {
                  id: `30`,
                  message: `
                    
                    The major differences between processed and natural cheese are
                    that natural cheeses have the whey (watery part of the milk) pressed out of them, 
                   while processed cheese does not; and processed cheese has a longer
                    shelf life as compared to natural cheese
                   
  
                    `,
                  //  trigger: `33`,
                  trigger: "1",
                },

                {
                  id: `31`,
                  message: `
                        
                        One ounce of hard cheese, or a wedge about the size of your thumb, 
                        contains about 120 calories, 8 grams (g) of protein,
                         6 g saturated fat, and 180 milligrams (mg) of calcium.
                         A half-cup of soft cheese like 4% full-fat cottage 
                        cheese has about 120 calories, 14 g protein, 3 g saturated fat, and 80 mg of calcium.
                                
                        `,
                  //  trigger: `34`,
                  trigger: "1",
                },
                {
                  id: `35`,
                  message: `
                            
                            The American Heart Association recommends eating 
                            no more than three portions of cheese per day, 
                            which each serving capped at 42 grams of cheese
                            
                            `,
                  //  trigger: `13`,
                  trigger: "1",
                },

                {
                  id: `end`,
                  message: `Awesome! You are a telepath!`,
                  trigger: "1",
                },
              ]}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default GetInformation;

Task 1 comments -
1. What is done well?
   1. Use of ngrx for state management.
   2. Use of angular material library .
   3. Use of angular reactive form so if form is too lengthy we can manage it through ts file.
   4. Use of google chart open source library.
2. What would you change?
	1. Instead of using hardcoded value we can use constants and enums.
	2. Add access specifier to component properties to define their access scope within application.
	3. Mentioning  actual datatype for the variables used in component against using datatype as any.
    4. Unsubscribe subscription of chart component.
	5. Use async pipe of ngrx to send data between components.
	6. Add error handling for chart api and also show error on UI.
	7. Writing test cases to ensure no test case is failing and code coverage is 100%
3. Are there any code smells or problematic implementations?
    1. Chart is not loaded because data send to chart component is an observable type, so added async 		pipe  to pass data to chart component. 
    2. Need to add API key in environment.ts file to get the application connect with backend API.

Additional comment like:
I have explored multiple chart types - LineChart, BarChart, PieChart.
Created an enum to contain these values. Further we can bind this enum with UI (dropdown), so user can make the selection for chart as per need.
Also attached different chart screenshots for reference.
In code, we are referring LineChart only but we can also think of making the selection dynamic as mentioned above. 


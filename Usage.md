Usage Notes

<!-- work break intervals -->
user opens app ->
timer displayed at 25 minutes, 
timer controls show start

user clicks on start button ->
timer counts down from 25 minutes,
work period indicated
(work session starts)

(work session)
user clicks on stop ->
timer resets to 25 minutes,
work period indicated
(finished pomodoros retains same value as before)

(finished pomodoros not divisible by 4)
25 minute work timer finishes ->
sound rings,
displayed timer changes to 5, 
break period indicated

(break session)
user clicks on start button ->
timer counts down from 5 minutes,
break period indicated

(break session)
5 minute break timer finishes ->
sound rings, 
displayed timer changes to 25 minutes,
work period indicated

(finished pomodoros divisible by 4)
25 minute work timer finishes ->
sound rings,
displayed timer changes to 30,
break period indicated

<!-- completing the day -->
user clicks on done for the day ->
dialogue pops up, Are you done for the day?

user clicks yes ->
dialogue pops up, you completed x pomodoros!

user clicks no ->
current session continues

<!-- step by step -->
user clicks on done for the day ->
dialogue pops up, you completed x pomodoros!

when you click on done for the day, you want the UI changed
you want a paragraph that displays how many pomodoros you finished
for  UI change to happen, you have to change some underlying data, which means a state has to keep track of it

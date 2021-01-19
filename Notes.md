#State makes UI interactive by triggering changes to the underlying data
states
-timer.active
-timer.timeRemaining

#Pomodoro interactions => data changes
start timer => timer's active state changes to true
countdown => timer's timeRemaining changes to timeRemaining - 1

#State change ramifications
when timer.active is true => timer is able to countdown
when timer timeRemaining is 0 => timer stops
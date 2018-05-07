(function() {
    'use strict';

    angular
        .module('weather')
        .controller('weatherCtrl', weatherCtrl);

    weatherCtrl.$inject = ['weatherSrv', '$location', '$routeParams'];

	function weatherCtrl(weatherSrv, $location, $routeParams){
		let vm = this
		vm.get_todays_date = get_todays_date
		vm.get_next_five_dates = get_next_five_dates()
		vm.getIconImageUrl = getIconImageUrl
		vm.action = action

		getKingstionForecast()
		getMobayForecast()

		function get_todays_date() {
			let today = new Date()

			return convert_to_string_date(today)
		}

		function convert_to_string_date(val) {
			let stringDate = new Date(val)

			let day = getDay(stringDate.getDay())
			let month = getMonth(stringDate.getMonth())
			let date = stringDate.getDate()			
			let year = stringDate.getFullYear()
			
			return day + ', ' + month + ' ' + date + ', ' + year
		}

		function get_next_five_dates() {
			let days = []
			for (let i = 0; i < 5; i++) {
				let today = new Date()
				today.setDate(today.getDate()+i+1)

				days.push(convert_to_string_date(today))
			}

			return days
		}

		function getDay(day) {
			if(day == 0) {
				return 'Sun'
			}
			else if(day == 1) {
				return 'Mon'
			}
			else if(day == 2) {
				return 'Tues'
			}
			else if(day == 3) {
				return 'Wed'
			}
			else if(day == 4) {
				return 'Thurs'
			}
			else if(day == 5) {
				return 'Fri'
			}
			else if(day == 5) {
				return 'Sat'
			}
		}

		function getMonth(month) {
			if(month == 0) {
				return 'January'
			}
			else if(month == 1) {
				return 'February'
			}
			else if(month == 2) {
				return 'March'
			}
			else if(month == 3) {
				return 'April'
			}
			else if(month == 4) {
				return 'May'
			}
			else if(month == 5) {
				return 'June'
			}
			else if(month == 6) {
				return 'July'
			}
			else if(month == 7) {
				return 'August'
			}
			else if(month == 8) {
				return 'September'
			}
			else if(month == 9) {
				return 'October'
			}
			else if(month == 10) {
				return 'November'
			}
			else if(month == 11) {
				return 'December'
			}
		}

		function groupByDates(forecasts) {
			let days = get_next_five_dates()

			let forcastGroups = []
			let forcastGroups1 = []
			let forcastGroups2 = []
			let forcastGroups3 = []
			let forcastGroups4 = []
			let forcastGroups5 = []

			for(let j = 0; j < forecasts.length; j++) {
				if (days[0] === convert_to_string_date(forecasts[j].date))
					forcastGroups2.push(forecasts[j])
				
				else if (days[1] === convert_to_string_date(forecasts[j].date))
					forcastGroups3.push(forecasts[j])
				
				else if (days[2] === convert_to_string_date(forecasts[j].date))
					forcastGroups4.push(forecasts[j])
				
				else if (days[3] === convert_to_string_date(forecasts[j].date))
					forcastGroups5.push(forecasts[j])
				
				else
					forcastGroups1.push(forecasts[j])
			}

			forcastGroups.push(minimizeGroups(forcastGroups1))
			forcastGroups.push(minimizeGroups(forcastGroups2))
			forcastGroups.push(minimizeGroups(forcastGroups3))
			forcastGroups.push(minimizeGroups(forcastGroups4))
			forcastGroups.push(minimizeGroups(forcastGroups5))

			return forcastGroups
		}

		function minimizeGroups(forecasts) {
			if(forecasts.length == 0)
		        return null;
		    let modeMap = {};
		    let maxEl = forecasts[0].main, maxCount = 1;
		    let count;
		    for(let i = 0; i < forecasts.length; i++) {
		    	if(forecasts[i].main === "Rain") {
		    		maxEl = "Rain"
		    		count = i;
					break;
				}
		        let el = forecasts[i].main;
		        if(modeMap[el] === null)
		            modeMap[el] = 1;
		        else
		            modeMap[el]++;  
		        if(modeMap[el] > maxCount) {
		            maxEl = el;
		            maxCount = modeMap[el];
		        }
		    }
		    let index = forecasts.findIndex(x => x.main===maxEl);
		    return { "main": maxEl, icon: forecasts[index].icon,  date:forecasts[index].date};
		}

		function getKingstionForecast() {
        	weatherSrv
		        .getForcast('Kingston')
		        .then(function(forcasts) {
		        	let forcast = []
		        	for (let i = 0; i < forcasts['list'].length; i++) {
		        		let weather = forcasts['list'][i].weather[0]
		        		weather.date = forcasts['list'][i].dt_txt.slice(0, -9)
		        		forcast.push(weather)
		        	}

	        		vm.kingstonForcast = groupByDates(forcast)
		        }).catch(function(error) {
		        	console.log(error);
		        })
		}

		function getMobayForecast() {
        	weatherSrv
		        .getForcast('Montego Bay')
		        .then(function(forcasts) {
		        	let forcast = []
		        	for (let i = 0; i < forcasts['list'].length; i++) {
		        		let weather = forcasts['list'][i].weather[0]
		        		weather.date = forcasts['list'][i].dt_txt.slice(0, -9)
		        		forcast.push(weather)
		        	}

	        		vm.MobayForcast = groupByDates(forcast)
		        }).catch(function(error) {
		        	console.log(error);
		        })
		}    

		function action(action) {
			if(action == "Rain")
				return "\n * Employees will work for 4 hours\n * IT people shouldn't hit the streets"
			else if(action == "Clear")
				return "\n * Employees will work for 8 hours"
			else
				return "\n No Actions"
		}

		function getIconImageUrl(iconName) {
		  return 'http://openweathermap.org/img/w/' + iconName + '.png'
		}
  }
})();
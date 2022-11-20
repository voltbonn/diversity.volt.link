
// Just to make the console a bit queer.
console.info('%c \n Be yourself! \n\n', `
  font-family: Ubuntu, sans-serif;
  font-size: 5rem;
  font-weight: bold;
  color: white;
  text-shadow:
    1px 1px #ff69b5,
    2px 2px #ff0000,
    3px 3px #ff8f00,
    4px 4px #ffff00,
    5px 5px #008f00,
    6px 6px #00c1c1,
    7px 7px #3e0099,
    8px 8px #8f008f;
`)
    
const CloudFunctionsPrefix = 'https://us-central1-volt-4eca0.cloudfunctions.net/save_formdata'



function resetBodyClasses() {
	body.classList.remove('error')
	body.classList.remove('success')
	body.classList.remove('saving')
}

function getByLanguage(objectWithValuesByLanguage) {
	let value = '[NO TRANSLATION FOUND!]'

	if (objectWithValuesByLanguage) {
    if (objectWithValuesByLanguage[_language_]) {
    	value = objectWithValuesByLanguage[_language_]
    } else if (objectWithValuesByLanguage['en']) {
    	value = objectWithValuesByLanguage['en']
    } else if (objectWithValuesByLanguage['de']) {
    	value = objectWithValuesByLanguage['de']
    }
	}

	// if (value.indexOf(' ') > -1) {
	// 	value = value.substr(0,value.lastIndexOf(' '))+'&nbsp;'+value.substr(value.lastIndexOf(' ')+1)
	// }

	return value
}
function generateForm(data) {
	// websiteTitle.innerHTML = 'Volt — '+getByLanguage(_DATA_.translation_texts.website_title).replace(/\n+/g, ' ')

	for (const section of _DATA_.sections) {

		var sectionEle = document.createElement('section')

		if (!!section.heading) {
			var sectionHeading = document.createElement('h2')
			sectionHeading.innerHTML = getByLanguage(section.heading)
			sectionEle.appendChild(sectionHeading)
		}

		if (!!section.intro) {
			var sectionIntro = document.createElement('p')
			sectionIntro.classList.add('intro')
			sectionIntro.innerHTML = getByLanguage(section.intro)
			sectionEle.appendChild(sectionIntro)
		}


		// display questions
		for (const questionKey of Object.keys(section.questions)) {
			const question = section.questions[questionKey]

			var questionEle = document.createElement('div')
			questionEle.classList.add('question')

			if (!!question.question) {
				var questionHeading = document.createElement('h3')
				questionHeading.innerHTML = getByLanguage(question.question)
				questionEle.appendChild(questionHeading)
			}

			if (!!question.why) {
				var question_why_text = document.createElement('p')
				question_why_text.classList.add('why_text')
				if (!question.info) {
					question_why_text.classList.add('no_info_text')
				}
				question_why_text.innerHTML = getByLanguage(question.why)
				questionEle.appendChild(question_why_text)
			}
			if (!!question.info) {
				var question_info_text = document.createElement('p')
				// question_info_text.classList.add('info_text')
				question_info_text.innerHTML = getByLanguage(question.info)
				questionEle.appendChild(question_info_text)
			}


			if (question.type == 'number') {
				let newInput = document.createElement('input')
				newInput.addEventListener('click', resetBodyClasses)
				newInput.setAttribute('name', questionKey)
				newInput.setAttribute('type', 'number')
				newInput.setAttribute('placeholder', '…')
				newInput.addEventListener('click', resetBodyClasses)
				// newInput.value = '123'
				questionEle.appendChild(newInput)
			} else if (question.type == 'checkbox') {
				for (const key of Object.keys(question.options)) {

					let labelEle = document.createElement('label')
					labelEle.classList.add('radio_or_checkbox_label')
					labelEle.addEventListener('click', resetBodyClasses)

					let checkboxEle = document.createElement('input')
					checkboxEle.setAttribute('type', 'checkbox')
					checkboxEle.setAttribute('name', questionKey)
					checkboxEle.setAttribute('value', key)
					labelEle.appendChild(checkboxEle)

					let spanEle = document.createElement('span')
					spanEle.innerHTML = getByLanguage(question.options[key])
					labelEle.appendChild(spanEle)

					questionEle.appendChild(labelEle)
				}
			} else if (question.type == 'radio') {
				for (const key of Object.keys(question.options)) {

					let labelEle = document.createElement('label')
					labelEle.classList.add('radio_or_checkbox_label')
					labelEle.addEventListener('click', resetBodyClasses)

					let checkboxEle = document.createElement('input')
					checkboxEle.setAttribute('type', 'radio')
					checkboxEle.setAttribute('name', questionKey)
					checkboxEle.setAttribute('value', key)
					labelEle.appendChild(checkboxEle)

					let spanEle = document.createElement('span')
					spanEle.innerHTML = getByLanguage(question.options[key])
					labelEle.appendChild(spanEle)

					questionEle.appendChild(labelEle)
				}
			} else if (question.type == 'chooser') {
				let newInput = document.createElement('select')
				newInput.addEventListener('click', resetBodyClasses)

				if (questionKey == 'metadata_country') {
					newInput.setAttribute('selectedValue', window.volt_country_party)
					for (const country_data of _DATA_.countries) {
						const disabled = country_data.disabled
						const value = (country_data.value ? country_data.value : '')

						let title = ''
						if (country_data.title) {
							title = country_data.title
						} else if (country_data.en && country_data.local_name && country_data.en != country_data.local_name) {
							title = country_data.en + ' (' + country_data.local_name + ')'
						} else if (country_data.en) {
							title = country_data.en
						} else if (country_data.local_name) {
							title = country_data.local_name
						}

						const optionEle = document.createElement('option')
						optionEle.setAttribute('name', questionKey)
						optionEle.setAttribute('value', value)
						optionEle.innerHTML = title
						if (window.volt_country_party == value) {
							optionEle.selected = true
						}
						if (disabled == true) {
							optionEle.disabled = true
						}
						newInput.appendChild(optionEle)
					}
				} else {
					// question.options = {
					// 	'': {de:'…'},
					// 	...question.options
					// }
					question.options = Object.assign({}, { '': { de: '…' } }, question.options)

					newInput.setAttribute('selectedValue', '')

					// let optionEle = document.createElement('option')
					// optionEle.setAttribute('value', '')
					// optionEle.innerHTML = '…'
					// newInput.appendChild(optionEle)

					// var c = 0
					for (const key of Object.keys(question.options)) {
						let optionEle = document.createElement('option')
						optionEle.setAttribute('name', questionKey)
						optionEle.setAttribute('value', key)
						optionEle.innerHTML = getByLanguage(question.options[key])
						// if (c == 1) {
						// 	optionEle.selected = true
						// }
						newInput.appendChild(optionEle)
						// c += 1
					}
				}

				newInput.addEventListener('change', e => {
					const optionEles = e.target.querySelectorAll('option')
					for (let optionEle of optionEles) {
						if (optionEle.selected) {
							newInput.setAttribute('selectedValue', optionEle.value)
							break
						}
					}
				})


				if (question.multiSelect) {
					newInput.setAttribute('multiple', 'multiple')
					question.showAllOptions = true
				}
				if (question.showAllOptions) {
					newInput.classList.add('showingAllOptions')
					newInput.setAttribute('size', Object.keys(question.options).length)
				} else {
					newInput.classList.add('not_showingAllOptions')
				}

				questionEle.appendChild(newInput)
			} else if (question.type == 'one_line_text') {
				let newInput = document.createElement('input')
				newInput.addEventListener('click', resetBodyClasses)
				newInput.setAttribute('name', questionKey)
				newInput.setAttribute('type', 'text')
				newInput.setAttribute('placeholder', '…')
				// newInput.value = 'some text'
				questionEle.appendChild(newInput)

				if (questionKey == 'metadata_city') {
					newInput.value = window.volt_city
				}
			} else {
				let newInput = document.createElement('textarea')
				newInput.addEventListener('click', resetBodyClasses)
				newInput.setAttribute('name', questionKey)
				// newInput.setAttribute('type', 'text')
				newInput.setAttribute('placeholder', '…')
				// newInput.innerHTML = 'some text'
				questionEle.appendChild(newInput)
			}

			sectionEle.appendChild(questionEle)
		}

		inputs.appendChild(sectionEle)
	}
}

function getMetadata(country, city) {
	// const now = new Date()

	let metadata = {
		// year and quater is calculated on the server
		// year: now.getFullYear(),
		// quater: Math.floor((now.getMonth() + 3) / 3),

		isFirstCompletion: !!metadataIsFirstCompletion.checked,
		// country: metadataCountries.getAttribute('selectedValue'),
		// city: metadataCity.value,

		country: country,
		city: city,
	}

	return metadata
}

function getTimelessButAnonymousTrackingCode(questionKey, answerKey) {
	// tatc = Timeless but Anonymous Tracking Code

	const shaObj = new jsSHA('SHA3-512', 'TEXT')
	shaObj.update(window.pre_tatc + '' + questionKey) // +' '+answerKey

	return shaObj.getHash('HEX')
}
function submitForm() {
	if (navigator.onLine) {

		var answers = []

		const elements = [
			...inputs.querySelectorAll('input[type="text"]'),
			...inputs.querySelectorAll('textarea'),
			...inputs.querySelectorAll('input[type="number"]'),
		]
		for (const ele of elements) {
			const questionKey = ele.getAttribute('name')
			const value = ele.value
			if (value != '' && questionKey != '') {
				answers.push({
					questionKey: questionKey,
					answerKey: null,
					value: value,
					// metadata: metadata,
					// tatc: getTimelessButAnonymousTrackingCode(questionKey, null),
				})
			}
		}

		for (const ele of inputs.querySelectorAll('option')) {
			const questionKey = ele.getAttribute('name')
			const answerKey = ele.value
			if (ele.selected && questionKey != '' && answerKey != '') {
				answers.push({
					questionKey: questionKey,
					answerKey: answerKey,
					value: true, // (ele.selected ? true : false),
					// metadata: metadata,
					// tatc: getTimelessButAnonymousTrackingCode(questionKey, null),
				})
			}
		}

		for (const ele of inputs.querySelectorAll('input[type="checkbox"]')) {
			const questionKey = ele.getAttribute('name')
			const answerKey = ele.value
			if (ele.checked && questionKey != '' && answerKey != '') {
				answers.push({
					questionKey: questionKey,
					answerKey: answerKey,
					value: true, // (ele.checked ? true : false),
					// metadata: metadata,
					// tatc: getTimelessButAnonymousTrackingCode(questionKey, answerKey),
				})
			}
		}

		for (const ele of inputs.querySelectorAll('input[type="radio"]')) {
			const questionKey = ele.getAttribute('name')
			const answerKey = ele.value
			if (ele.checked && questionKey != '' && answerKey != '') {
				answers.push({
					questionKey: questionKey,
					answerKey: answerKey,
					value: true, // (ele.checked ? true : false),
					// metadata: metadata,
					// tatc: getTimelessButAnonymousTrackingCode(questionKey, answerKey),
				})
			}
		}



		if (answers.length > 0) {
			body.classList.add('saving')

			// add the metadata
			const metadata_country_value = answers.filter(a => a.questionKey == 'metadata_country').map(a => a.answerKey)[0] || ''
			const metadata_city_value = answers.filter(a => a.questionKey == 'metadata_city').map(a => a.value)[0] || ''

			const metadata = getMetadata(metadata_country_value, metadata_city_value)
			answers = answers.filter(answer => answer.questionKey != 'metadata_country' && answer.questionKey != 'metadata_city')
			// answers = answers.map(answer=> ({
			// 	...answer,
			// 	metadata: metadata,
			// 	tatc: getTimelessButAnonymousTrackingCode(answer.questionKey, answer.answerKey),
			// }) )
			answers = answers.map(answer => Object.assign({}, answer, {
				metadata: metadata,
				tatc: getTimelessButAnonymousTrackingCode(answer.questionKey, answer.answerKey),
			}))

			console.log('answers:', answers)


			let startTS = new Date() * 1
			console.info('START', 0)

			async.each(answers, (answer, callback) => {
				const xmlReq = new XMLHttpRequest()
				xmlReq.addEventListener('load', event => {
					const json_res = JSON.parse(event.target.responseText)
					if (!!json_res && !json_res.error) {
						callback()
					} else {
						callback('error')
					}
				})
				xmlReq.open('GET', CloudFunctionsPrefix + '?data=' + encodeURIComponent(JSON.stringify({ answers: [answer] })))
				xmlReq.send()
			}, error => {
				console.info('END', (new Date() * 1) - startTS)
				if (!!error) {
					body.classList.add('error')
					body.classList.remove('saving')
				} else {
					body.classList.add('success')
					body.classList.remove('saving')
					clearForm()
				}
			})
		}
	}
}

function clearForm() {
	for (const ele of inputs.querySelectorAll('input[type="text"]')) {
		ele.value = ''
	}
	for (const ele of inputs.querySelectorAll('input[type="number"]')) {
		ele.value = ''
	}
	for (const ele of inputs.querySelectorAll('input[type="checkbox"]')) {
		ele.checked = false
	}
	for (const ele of inputs.querySelectorAll('option')) {
		ele.selected = false
	}
}

function getIdentifier() {
	// a got a few things from https://github.com/Valve/fingerprintjs2/blob/master/fingerprint2.js

	// var getDoNotTrack = function() {
	// 	if (navigator.doNotTrack) {
	// 		return navigator.doNotTrack
	// 	} else if (navigator.msDoNotTrack) {
	// 		return navigator.msDoNotTrack
	// 	} else if (window.doNotTrack) {
	// 		return window.doNotTrack
	// 	} else {
	// 		return false
	// 	}
	// }
	var getTouchSupport = function () {
		var maxTouchPoints = 0
		var touchEvent;
		if (typeof navigator.maxTouchPoints !== 'undefined') {
			maxTouchPoints = navigator.maxTouchPoints
		} else if (typeof navigator.msMaxTouchPoints !== 'undefined') {
			maxTouchPoints = navigator.msMaxTouchPoints
		}
		try {
			document.createEvent('TouchEvent')
			touchEvent = true
		} catch (_) {
			touchEvent = false
		}
		var touchStart = 'ontouchstart' in window
		return [maxTouchPoints, touchEvent, touchStart]
	}
	var timezone = function () {
		if (window.Intl && window.Intl.DateTimeFormat) {
			return new window.Intl.DateTimeFormat().resolvedOptions().timeZone
		}
		return false
	}

	var relativly_unique_information = {
		browserPlatform: navigator.platform,
		javaEnabled: navigator.javaEnabled(),
		dataCookiesEnabled: navigator.cookieEnabled,

		sizeScreenAvailWidth: screen.availWidth,
		sizeScreenAvailHeight: screen.availHeight,
		sizeScreenWidth: screen.width,
		sizeScreenHeight: screen.height,
		scrColorDepth: screen.colorDepth,
		scrPixelDepth: screen.pixelDepth,

		hardwareConcurrency: navigator.hardwareConcurrency,
		// doNotTrack: getDoNotTrack(),

		isTouchCapable: getTouchSupport().join('|'),
		// isTouchCapable:  'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0,

		timezoneOffset: new Date().getTimezoneOffset(),
		timezone: timezone(),

		browserLanguage: (navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage),
		languages: [...(navigator.languages || [])].sort().join('|'),
	}

	return Object.values(relativly_unique_information).join('|')
}


function parseQuery(queryString) {
	var query = {}
	var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&')
	for (var i = 0; i < pairs.length; i++) {
		var pair = pairs[i].split('=')
		if (pair[0] != '') {
			query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
		}
	}
	return query
}
function obj2searchQuery(obj) {
	var query_parts = []
	for (const key of Object.keys(obj)) {
		query_parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
	}
	return '?' + query_parts.join('&')
}
function setMetadata() {
	// const now = new Date()
	// metaDataCurrentYear.innerHTML = now.getFullYear()
	// metadataCurrentRangeInYear.innerHTML = getByLanguage(_DATA_.months[now.getMonth()+1]) // quater = Math.floor((now.getMonth() + 3) / 3)

	const locationSearchObj = parseQuery(window.location.search)
	window.volt_country_party = (!!locationSearchObj.country ? locationSearchObj.country.toUpperCase() : 'DEU')
	window.volt_city = (!!locationSearchObj.city ? locationSearchObj.city : '')

	window.pre_tatc = (!!locationSearchObj.tatc ? locationSearchObj.tatc : getIdentifier()) // tatc from get   OR   a relatively good unique idetifier
	// tatc = Timeless but Anonymous Tracking Code
}

function updateLanguageTexts() {
	const translationNodes = document.querySelectorAll('[data-translation-key]')

	for (let translationNode of translationNodes) {
		const translationKey = translationNode.getAttribute('data-translation-key')
		if (_DATA_.translation_texts[translationKey]) {
			let text = ''
			if (_DATA_.translation_texts[translationKey].use_instead && _DATA_.translation_texts[_DATA_.translation_texts[translationKey].use_instead]) {
				text = getByLanguage(_DATA_.translation_texts[_DATA_.translation_texts[translationKey].use_instead])
			} else {
				text = getByLanguage(_DATA_.translation_texts[translationKey])
			}

			if (_DATA_.translation_texts[translationKey].prefix) {
				text = _DATA_.translation_texts[translationKey].prefix + text
			}

			let translationDestination = ''
			if (translationNode.hasAttribute('data-translation-dest')) {
				translationDestination = translationNode.getAttribute('data-translation-dest')
			}

			if (translationDestination == 'attr-content') {
				const temp_node = document.createElement("div")
				temp_node.innerHTML = text
				translationNode.setAttribute('content', temp_node.textContent || temp_node.innerText || "")
				delete temp_node
			} else {
				text = text.replace(/\t+/g, '')
				text = text.replace(/(^\n+|\n+$)/g, '')
				if (!_DATA_.translation_texts[translationKey].is_plain) {
					text = text.replace(/\n/g, '<br>')
				}
				translationNode.innerHTML = text
			}
		}
	}
}


const body = document.getElementsByTagName('body')[0]
const websiteTitle = document.getElementById('websiteTitle')
const languageChooserSelect = document.getElementById('languageChooserSelect')
const metadataIsFirstCompletion = document.getElementById('metadataIsFirstCompletion')
const inputs = document.getElementById('inputs')
const submitButton = document.getElementById('submitButton')



const buttons_to_page = document.querySelectorAll('button[to-page]')
for (const button of buttons_to_page) {
	button.addEventListener('click', () => {
		const toPage = button.getAttribute('to-page')
		if (!['', 'intro', 'privacy', 'questions'].includes(toPage)) {
			toPage = ''
		}
		body.setAttribute('show', toPage)
		window.scrollTo(0, 0)
		history.pushState(null, websiteTitle.innerText, '#' + toPage)
	})
}

languageChooserSelect.addEventListener('change', e => {
	const optionEles = e.target.querySelectorAll('option')
	for (let optionEle of optionEles) {
		if (optionEle.selected) {
			window._language_ = optionEle.value
			updateLanguageTexts()

			var locationSearchObj = parseQuery(window.location.search)
			locationSearchObj.lang = optionEle.value
			history.pushState(null, websiteTitle.innerText, window.location.protocol + '//' + window.location.host + window.location.pathname + obj2searchQuery(locationSearchObj) + window.location.hash)

			break
		}
	}
})

function checkUrl() {

	// check hash

	let hash = document.location.hash
	if (hash.charAt(0) === '#') {
		hash = hash.slice(1)
	}
	body.setAttribute('show', hash)



	// check search

	const locationSearchObj = parseQuery(window.location.search)

	// set language
	window._language_ = locationSearchObj.lang || 'de'
	updateLanguageTexts()

}
window.addEventListener('popstate', checkUrl)




submitButton.addEventListener('click', () => {
	submitForm()
})



function _DATA_GOT_LOADED() {
	if (typeof _DATA_ !== 'undefined') {
		checkUrl()
		setMetadata()
		generateForm(_DATA_)
	}
}
_DATA_GOT_LOADED()

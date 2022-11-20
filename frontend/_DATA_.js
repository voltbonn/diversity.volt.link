


const _DATA_ = {
	translation_texts: {
		website_title: {
			is_plain: true,
			prefix: 'Volt - ',
			use_instead: 'website_heading',
		},
		website_heading: {
			de: 'Umfrage zur\ninternen Diversität',
			en: 'Internal\nDiversity\nSurvey',
		},
		website_description: {
			// de: `
			// 	Um unseren internen Diversitäts-Ansprüchen nachkommen zu können, müssen wir rausfinden wie divers wir sind.
			// 	Mit dieser Umfrage möchten wir ein Bild davon bekommen.
			// `,
			de: `
				Um unseren internen Diversitäts-Ansprüchen nachzukommen, müssen wir rausfinden wie divers wir sind.
				Mit dieser Umfrage machen wir uns ein Bild davon.
			`,
			en: `
				To meet our internal diversity goals, we need to find out how diverse we actually are.
				With this survey, we'll get a picture of that.
			`,
		},
		//website_privacy: {de:`
		//	<span class="markedText dark_on_light">Da uns <strong class="markedText black_on_orange">Privatsphäre</strong> wichtig ist, werden die Antworten jeweils zur Frage gruppiert gespeichert, sodass die hier eingegebenen Daten <strong>nicht auf dich zurückführbar</strong> sind.</span>
		//
		//	<span class="markedText light_on_dark">Zu den einzelnen Datensätzen werden nur die im folgenden Kasten genannten Metadaten gespeichert.</span>
		//
		//	<span class="markedText light_on_dark">Bei Fragen kannst du dich an <a href="mailto:thomas.rosen@volteuropa.org">thomas.rosen@volteuropa.org</a> wenden.</span>
		//`},

		// necessary_metadata: {de: 'Benötigte Metadaten: '},
		// voluntary_metadata: {de: 'Freiwillige Metadaten: '},
		// metadata_running_year: {de: 'Das laufende Jahr:'},
		// metadata_running_month: {de: 'Der laufende Monat:'},
		// metadata_tatc_info: {de: 'Ein, für jede Frage unterschiedlicher, annonymer Tracking-Code.'},
		// metadata_if_it_is_first_completion: {de: 'Ob du das erste Mal an der Umfrage&nbsp;teilnimmst.'},
		// your_country: {de: 'Dein Land:'},
		// your_city: {de: 'Deine Stadt:'},
		// voluntary_metadata_description: {de: 'Jeweils das Land und/oder das Städteteam in dem du am aktivsten&nbsp;bist.'},

		button_sourcecode: {
			de: 'Den Quellcode kannst du auf GitHub anschauen.',
			en: 'View the code on GitHub.',
		},

		button_to_privacy: {
			de: 'Los geht\'s',
			en: 'Let\'s start',
		},

		heading_privacy: {
			de: 'Privatsphäre und Datenschutz',
			en: 'Privacy',
		},
		heading_optional: {
			de: 'Freiwillig',
			en: 'Optional',
		},
		optional_info: {
			de: 'Beantworte nur die Fragen die du beantworten möchtest.',
			en: 'Only answer the questions you want to answer.',
		},
		heading_anonymous: {
			de: 'Anonym',
			en: 'Anonymous',
		},
		anonymous_info: {
			de: 'Die Antworten werden jeweils zur Frage gruppiert gespeichert. Rückschlüsse auf Dich sind nicht möglich.',
			en: 'The answers are saved in groups for each question. It is not possible to draw conclusions about you.',
		},
		privacy_details: {
			de: `
				Zu jeder Frage werden das aktuelle Jahr und der aktuelle Monat gespeichert. Optional werden dazu noch dein Land und deine Stadt gespeichert.
			
				Volt Europa verwendet Deine im Rahmen dieser Umfrage angegebenen Daten ausschließlich, um die Umfrage auszuwerten und die Ergebnisse gegebenenfalls mit Mitgliedern von Volt Europa zu teilen. Weitere Informationen kannst Du unserer Datenschutzerklärung auf <a target="_blank" href="https://www.volteuropa.org/privacy">www.volteuropa.org/privacy</a> entnehmen.
			
				Bei Fragen zu dieser Umfrage kannst du dich an <a target="_blank" href="mailto:thomas.rosen@volteuropa.org">thomas.rosen@volteuropa.org</a> wenden.
			`,
			en: `
				For each question the current year and month are saved. Optionally, your current country and city are saved as well.
			
				Volt Europa will only use the information you provide in this survey for the purpose of evaluating the survey and sharing the results with Volt Europa members, if applicable. For more information, please see our privacy policy at <a target="_blank" href="https://www.volteuropa.org/privacy">www.volteuropa.org/privacy</a>.
			
				If you have any questions about this survey, please contact <a target="_blank" href="mailto:thomas.rosen@volteuropa.org">thomas.rosen@volteuropa.org</a>.
			`,
		},
		button_to_questions: {
			de: 'Zu den Fragen',
			en: 'To the questions',
		},

		metadata_is_this_the_first_completion: {
			de: 'Nimmst du das erste Mal an der Umfrage teil?',
			en: 'Is this your first time participating in the survey?',
		},
		button_send_to_volt: {
			de: 'An Volt senden',
			en: 'Send to Volt',
		},

		saving: {
			de: 'Deine Antworten werden gespeichert…',
			en: 'Your answers are being saved…',
		},
		success: {
			de: 'Deine Antworten wurden gespeichert!',
			en: 'Your answers have been saved!',
		},
		error: {
			de: 'Es gab ein technisches Problem!\nBist du eventuell nicht mit dem Internet verbunden?\n\nMelde dich bei Bedarf bei Thomas Rosen.',
			en: 'There was a technical problem! Perhaps you are not connected to the internet?\n\nContact Thomas Rosen if necessary.',
		},

		results: {
			de: 'Ergebnisse',
			en: 'Results',
		},
	},
	sections: [
		{
			heading: {
				de: 'Metadaten',
				en: 'Metadata',
			},
			questions: {
				metadata_country: {
					question: {
						de: 'Dein Land',
						en: 'Your country',
					},
					type: 'chooser',
					options: {},
				},
				metadata_city: {
					question: {
						de: 'Dein Städteteam',
						en: 'Your cityteam',
					},
					type: 'one_line_text',
				},
			}
		},
		{
			heading: {
				de: 'Bildung',
				en: 'Education',
			},
			questions: {
				highest_degree_of_education: {
					question: { de: 'Dein höchster Bildungsabschluss…' },
					// why: {de: 'Aus welcher Bildungsschicht kommen unsere Mitglieder?'},
					type: 'radio', // 'chooser',
					options: {
						'none': { de: 'Kein Abschluss' },
						'ISCED_1': { de: 'Vollendung der Grundschule' },
						'ISCED_2': { de: 'Haupt- / Realschulabschluss' },
						'ISCED_3': { de: 'Abitur' },
						'ISCED_4': { de: 'Fachhochschulreife / Fachabitur' },  // {de: 'Fachhochschulreife / Fachgebundene Hochschulreife(Fachabitur)'},
						'ISCED_5': { de: 'Meister' },
						'ISCED_6': { de: 'Bachelor / Diplom(FH)' },
						'ISCED_7': { de: 'Master / Diplom(Uni)' },
						'ISCED_8': { de: 'Doktorat / PhD' },
					}
				},
				good_communication_in_english: {
					question: { de: 'Kannst du dich gut auf Englisch verständigen?' },
					why: { de: 'Als internationale Organisation wird viel auf Englisch kommuniziert. Hiermit möchten wir schauen, ob mehr in die einzelnen Sprachen übersetzt werden sollte.' },
					type: 'radio',
					options: {
						'yes': {
							de: 'Ja',
							en: 'Yes',
						},
						'no': {
							de: 'Nein',
							en: 'No',
						},
					}
				},
				problems_with_computers: {
					question: { de: 'Hast du gelegentlich/oft Probleme dich am Computer oder Handy zurecht zu finden?' },
					why: { de: 'Wir schauen hiermit, wie viel wir innerhalb von Volt auf technische Lösungen setzten können?' },
					type: 'radio',
					options: {
						'yes': { de: '(Eher) Ja' },
						'no': { de: '(Eher) Nein' },
						'depends': { de: 'Kommt drauf an (Gerät, Betriebsystem, Anwendung,…)' },
					}
				},
			}
		},
		{
			heading: { de: 'Kultur' },
			questions: {
				amount_of_kown_languages: {
					question: { de: 'Wie viele Sprachen kannst du sprechen/verstehen?' },
					why: { de: 'Austausch über die eigene Sprach-Bubble hinaus.' },
					info: { de: 'Zähl auch Mutter- und Gebärdensprachen dazu.' },
					type: 'radio',
					options: {
						'1': { de: '1' },
						'2': { de: '2' },
						'3': { de: '3' },
						'4': { de: '4' },
						'5+': { de: '5 oder mehr' },
					}
				},
				different_country_of_origin: {
					question: { de: 'Lebst du in einem anderen Land als du geboren bist?' },
					why: { de: 'Wissen anderer Kulturen in Volt.' },
					type: 'radio',
					options: {
						'yes': {
							de: 'Ja',
							en: 'Yes',
						},
						'no': {
							de: 'Nein',
							en: 'No',
						},
					}
				},
			}
		},
		{
			heading: { de: 'Diskriminierung' },
			questions: {
				discriminatory_experiences: {
					question: { de: 'In welchen Bereichen hast du schonmal diskriminierende Erfahrungen gemacht?' },
					// why: {de: 'Hier mit möchten wir herrausfinden, wie privilegiert Volt Mitglieder sind.'},
					type: 'checkbox',
					options: {
						'ancestry': { de: 'Ethnische Herkunft oder Hauttyp' },
						'sex_or_gender': { de: 'Geschlecht oder Gender' },
						'sexual_orientation': { de: 'Sexuelle Orientierung' },
						'age': { de: 'Alter' },
						'disabilities': { de: 'Behinderung oder chronische Krankheit' },
						'ideology': { de: 'Religion oder Weltanschauung' },
						'classism': { de: 'Vermögen oder sozialen Herkunft' },
						'other': { de: 'andere Bereiche' },
					},
				},
				// discriminatory_experiences_within_volt: {
				// 	question: {de: 'Hast diskriminierende Erfahrungen innerhalb von Volt gemacht?'},
				// 	// why: {de: 'Hier mit möchten wir herrausfinden, wie privilegiert Volt Mitglieder sind.'},
				// 	type: 'checkbox',
				// 	options: {
				// 		'yes': {de: 'Ja'},
				// 		'no': {de: 'Nein'},
				// 	},
				// },
			},
		},
		{
			heading: { de: 'LGBTQ*' },
			questions: {
				gender: {
					question: { de: 'Wie bezeichnest du dein Gender?' },
					why: { de: 'Gender ist nicht das Geschlecht in deinem Ausweiß, sondern beschreibt die nicht an biologische Merkmale gebundenen Geschlechtsaspekte des Menschen.' },
					type: 'radio', // 'chooser',
					options: {
						'female': { de: 'weiblich' },
						'male': { de: 'männlich' },
						'non_binary': { de: 'non-binary / weder weiblich noch männlich' },
						'gender_fluid': { de: 'gender-fluid' },
						'not_sure': { de: 'Ich bin mir nicht sicher.' },
						'terms_dont_fit': { de: 'Diese Begriffe passen nicht zu mir.' },
					},
				},
				gender_identity: {
					question: { de: 'Wie bezeichnest du deine Geschlechtsidentität?' },
					why: { de: 'Um die Probleme einer Trans-Person vollständig nachvollziehen zu können, muss man selbst Trans* sein. Daher sollten wir wissen, wie gut wir zu diesem Thema aufgestellt sind.' },
					info: { de: 'Cisgender: Biologisches Geschlecht und Gender sind gleich.' },
					type: 'radio', // 'chooser',
					options: {
						'transgender': { de: 'Transgender' },
						'cisgender': { de: 'Cisgender' },
						'not_sure': { de: 'Ich bin mir nicht sicher' },
						'terms_dont_fit': { de: 'Diese Begriffe passen nicht zu mir.' },
					},
				},
				sexual_orientation: {
					question: { de: 'Wie bezeichnest du deine sexuelle Orientierung?' },
					why: { de: 'Um die Probleme einer queeren Person vollständig nachvollziehen zu können, muss man queer sein. Daher sollten wir wissen, wie gut wir zu diesem Thema aufgestellt sind.' },
					type: 'radio', // 'chooser',
					options: {
						'homosexual': { de: 'homosexuell / lesbisch / schwul / …' },
						'interested_in_more_than_one_gender': { de: 'bisexuell / pansexuell / polysexuell / …' }, // {de: 'bisexuell / bi / ambisexuell / pansexuell / polysexuell / …'},
						'queer': { de: 'queer' },
						'asexual': { de: 'asexuell' },
						'heterosexual': { de: 'heterosexuell / straight' },
						'not_sure': { de: 'Ich bin mir nicht sicher.' },
						'terms_dont_fit': { de: 'Diese Begriffe passen nicht zu mir.' },
					},
				},
			},
		},
		{
			heading: { de: 'Psyche' },
			questions: {
				psychological_difficulties: {
					question: { de: 'Hast du (unabhängig von einer psychiatrischen Diagnose) mit anhaltenden oder immer wiederkehrenden psychischen Schwierigkeiten zu tun haben?' },
					why: { de: 'Unsere Reaktion auf, für uns ungewohntes Verhalten der Mitglieder.' },
					type: 'radio',
					options: {
						'yes': {
							de: 'Ja',
							en: 'Yes',
						},
						'no': {
							de: 'Nein',
							en: 'No',
						},
					}
				},
				//introverted_or_extroverted: {
				//	question: {de: 'Bist du eher introvertiert oder extrovertiert?'},
				//	why: {de: 'Wir müssen auch auf Mitglieder achten, die sich bei Diskussion nicht selbstständig durchsetzten? Oder denen viele Menschen ab und zu zuanstrengend sind.'},
				//	type: 'radio',
				//	options: {
				//		'more_introverted': {de: 'eher introvertiert'},
				//		'terms_dont_fit': {de: 'je nachdem / weder noch / kommt drauf an'},
				//		'more_extroverted': {de: 'eher extrovertiert'},
				//	}
				//},
				participating_in_offline_discussions: {
					question: { de: 'Wie wohl würdest du dich fühlen, an einer Diskussion bei einer face-to-face Veranstaltung (z.B. einem Meet & Greet) teilzunehmen?' },
					why: { de: 'Wir müssen auch auf Mitglieder achten, die sich bei Diskussion nicht selbstständig durchsetzten, oder denen viele Menschen ab und zu zuanstrengend sind.' },
					type: 'radio',
					options: {
						'5': { de: 'Sehr wohl' },
						'4': { de: 'Eher wohl' }, // Einigermaßen wohl
						'3': { de: 'Weder noch' },
						'2': { de: 'Eher unwohl' }, // Einigermaßen unwohl
						'1': { de: 'Sehr unwohl' },
					}
				},
				participating_in_online_discussions: {
					question: { de: 'Wie wohl würdest du dich fühlen, an einer Diskussion auf Workplace (oder einem anderen Online-Tool) teilzunehmen?' },
					why: { de: '(Begründung, siehe vorherige Frage.)' },
					type: 'radio',
					options: {
						'5': { de: 'Sehr wohl' },
						'4': { de: 'Eher wohl' },
						'3': { de: 'Weder noch' },
						'2': { de: 'Eher unwohl' },
						'1': { de: 'Sehr unwohl' },
					}
				},
			},
		},
		{
			heading: { de: 'Hilfsmittel' },
			questions: {
				everyday_aids: {
					question: { de: 'Welche Hilfsmittel benötigst du im Alltag?' },
					why: { de: 'Erreichbarkeit und Verständigung bei den Events.' },
					type: 'checkbox',
					options: {
						'wheelchair': { de: 'Rollstuhl' },
						'walking_aid': { de: 'Rollator / Krücken / Gehstock / …' },
						'hearing_aid': { de: 'Hörgerät / Mikrofon' },
						'seeing_aid': { de: 'Brille / Lupe' },
						'assistance': { de: 'Assistenz (Tier, Mensch oder Roboter)' },

						'prosthesis': { de: 'Prothese' },
						'orthosis': { de: 'Orthese' },

						'other': { de: 'andere Hilfsmittel' }, // (Screenreader, Brailledisplay, …)
					}
				},
				financial_help: {
					question: { de: 'Bekommst du finanzielle Hilfe. (Bafög, Hartz4, Jugendamt, …)' },
					why: { de: 'Je nach verfügbarer Geldmenge kann man einfacher an bestimmten Events teilnehmen.' },
					type: 'radio',
					options: {
						'yes': {
							de: 'Ja',
							en: 'Yes',
						},
						'no': {
							de: 'Nein',
							en: 'No',
						},
					}
				},
			}
		},
		{
			heading: { de: 'Verbesserung der Umfrage' },
			intro: { de: 'Die ist unsere erste Umfrage dieser Art. Hier kannst du uns helfen diese weiter zu entwickeln …' },
			questions: {
				text_whats_missing: {
					question: { de: 'Welche Merkmale fehlen Deiner Meinung nach hier, sind aber aus Deiner Sicht für Diversität in Volt wichtig?' },
					// why: '',
					info: { de: '(und sollten noch abgefragt werden)' },
					type: 'text',
				},
				text_whats_to_much: {
					question: { de: 'Welche Merkmale sollten wir künftig nicht mehr abfragen?' },
					// why: '(Hinweis: Alle Antworten sind freiwillig!)',
					type: 'text',
				},
				text_other_stuff: {
					question: { de: 'Sonstige Anmerkungen?' },
					// why: '',
					type: 'text',
				},
			},
		},
	],
	countries: [
		// The List is from: https://volt.team/teams

		{ title: 'Keine Angabe' },
		{ disabled: true },
		{ value: 'AUT', local_name: 'Österreich', en: 'Austria' },
		{ value: 'BEL', local_name: 'Belgique / Belgie', en: 'Belgium' },
		{ value: 'BGR', local_name: 'Bulgaria', en: 'Bulgaria' },
		{ value: 'CYP', local_name: 'Kibris / Kypros', en: 'Cyprus' },
		{ value: 'CZE', local_name: 'Ceska Republika', en: 'Czech Republic' },
		{ value: 'DNK', local_name: 'Danmark', en: 'Denmark' },
		{ value: 'DEU', local_name: 'Deutschland', en: 'Germany' },
		{ value: 'EST', local_name: 'Eesti Vabariik', en: 'Estonia' },
		{ value: 'IRL', local_name: 'Éire', en: 'Ireland' },
		{ value: 'ESP', local_name: 'España', en: 'Spain' },
		{ value: 'FRA', local_name: 'France', en: 'France' },
		{ value: 'GRC', local_name: 'Ellas / Ellada', en: 'Greece' },
		{ value: 'HRV', local_name: 'Hrvatska', en: 'Croatia' },
		{ value: 'HUN', local_name: 'Magyarorszag', en: 'Hungary' },
		{ value: 'ITA', local_name: 'Italia', en: 'Italy' },
		{ value: 'LVA', local_name: 'Latvija', en: 'Latvia' },
		{ value: 'LTU', local_name: 'Lietuva', en: 'Lithuania' },
		{ value: 'LUX', local_name: 'Luxembourg / Letzebuerg', en: 'Luxembourg' },
		{ value: 'MLT', local_name: 'Malta', en: 'Malta' },
		{ value: 'NLD', local_name: 'Nederland / Holland', en: 'Netherlands' },
		{ value: 'POL', local_name: 'Polska', en: 'Poland' },
		{ value: 'PRT', local_name: 'Portugal', en: 'Portugal' },
		{ value: 'ROU', local_name: 'Romania', en: 'Romania' },
		{ value: 'SVK', local_name: 'Slovensko', en: 'Slovakia' },
		{ value: 'SVN', local_name: 'Slovenija', en: 'Slovenia' },
		{ value: 'FIN', local_name: 'Suomi', en: 'Finland' },
		{ value: 'SWE', local_name: 'Sverige', en: 'Sweden' },
		{ value: 'GBR', local_name: 'United Kingdom', en: 'United Kingdom' },

		// Volt New Territories:
		{ disabled: true },
		{ value: 'ALA', local_name: 'Landskapet Åland / Ahvenanmaan maakunta', en: 'Åland Islands' },
		{ value: 'ALB', local_name: 'Shqiperia', en: 'Albania' },
		{ value: 'AND', local_name: 'Andorra', en: 'Andorra' },
		{ value: 'BIH', local_name: 'Bosna i Hercegovina', en: 'Bosnia and Herzegovina' },
		{ value: 'FRO', local_name: 'Føroyar', en: 'Faroe Islands' },
		{ value: 'GIB', local_name: 'Gibraltar', en: 'Gibraltar' },
		{ value: 'GGY', local_name: 'Guernsey', en: 'Guernsey' },
		{ value: 'ISL', local_name: 'Ísland', en: 'Iceland' },
		{ value: 'IMN', local_name: 'Isle of Man', en: 'Isle of Man' },
		{ value: 'JEY', local_name: 'Jersey', en: 'Jersey' },
		{ value: 'LIE', local_name: 'Liechtenstein', en: 'Liechtenstein' },
		{ value: 'MKD', local_name: 'Makedonija', en: 'Macedonia (FYROM)' },
		{ value: 'MDA', local_name: 'Moldova', en: 'Moldova' },
		{ value: 'MCO', local_name: 'Monaco', en: 'Monaco' },
		{ value: 'MNE', local_name: 'Crna Gora', en: 'Montenegro' },
		{ value: 'NOR', local_name: 'Norge', en: 'Norway' },
		{ value: 'SMR', local_name: 'San Marino', en: 'San Marino' },
		{ value: 'CHE', local_name: 'Schweiz / Suisse / Svizzera', en: 'Switzerland' },
		{ value: 'BLR', local_name: 'Беларусь', en: 'Belarus' },
		{ value: 'SRB', local_name: 'Србија', en: 'Serbia' },
		{ value: 'UKR', local_name: 'Україна', en: 'Ukraine' },

		{ disabled: true },
		{ value: 'Volt Abroad', title: 'Volt Abroad (Australia, Canada, Singapore, Thailand, Uruguay, USA, …)' },
		// TODO: Should there be an entry "Volt Europa"?
	]
}

try {
	if (!!module && module.exports) {
		module.exports = _DATA_
	}
} catch (error) {
	if (!!_DATA_GOT_LOADED) {
		_DATA_GOT_LOADED()
	}
}

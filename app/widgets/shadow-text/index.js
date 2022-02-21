'use strict';
import { constructWidgets } from '../construct-widgets';
import { inspectObject, dumpProperties } from '../../devTools';

// DEFAULTS in widgets/shadow-text/styles.css
// this allows them to get overwritten from main CSS if set there

const construct = (el) => {
	// PROPERTIES
	// FIX TEXT-PROPERTIES
	//(same for all elements of instance)
	Object.defineProperty(el, 'fontSize', {
		set(newValue) {
			mainContainer.textEl.fontSize =
				shadowContainer.textEl.fontSize =
				lightContainer.textEl.fontSize =
					newValue;
		},
	});

	const defProps = (prop, obj) => {
		Object.defineProperty(el, prop, {
			set(newValue) {
				obj[prop] = newValue;
				el.redraw();
			},
		});
	};

	Object.defineProperty(el, 'text', {
		set(newValue) {
			mainContainer.textEl.text =
				shadowContainer.textEl.text =
				lightContainer.textEl.text =
					newValue; // could iterate if preferred, but that would be slower
		},
	});

	Object.defineProperty(el, 'textAnchor', {
		set(newValue) {
			mainContainer.textEl.textAnchor =
				shadowContainer.textEl.textAnchor =
				lightContainer.textEl.textAnchor =
					newValue; // could iterate if preferred, but that would be slower
		},
	});

	Object.defineProperty(el, 'letterSpacing', {
		set(newValue) {
			mainContainer.textEl.letterSpacing =
				shadowContainer.textEl.letterSpacing =
				lightContainer.textEl.letterSpacing =
					newValue; // could iterate if preferred, but that would be slower
		},
	});

	// Exposes property and returns all values to owner
	const assignProps = (prop, obj) => {
		Object.defineProperty(el, prop, {
			get() {
				return obj;
			},
		});
	};

	let createTextElContainer = (id) => {
		// Constructs a closure around a TextElement object.
		// id: string: id of <TextElement> element
		let _textEl = el.getElementById(id); // private because in closure; might be overkill because widget itself is a closure as well

		return {
			// this object gets assigned to mainElContainer
            get textEl() {
                return _textEl;
			
			}, // only for internal use; don't expose publicly
			get API() {
				// public members
				return Object.seal({
					// .seal results in 'invalid arg type' error if caller attempts to set a property that isn't defined here
					get style() {
						// c/- BarbWire; we only expose style.fill just to demonstrate restrictive API: calling code should be unable to access other style properties
						return {
							get fill() { return _textEl.style.fill; },
                            set fill(color) { _textEl.style.fill = color; },
                            
								
							
						};
					},
				});
			},
		};
	};
    
	let createOuterTextElContainer = (id) => {
		// TODO P can this be derived from createTextElContainer?
		// Constructs a closure around a TextElement object.
		// id: string: id of <TextElement> element
		let _textEl = el.getElementById(id); // private because in closure

		return {
			// this object gets assigned to *Container
			get textEl() {
				return _textEl;
			}, // only for internal use; don't expose publicly
			get API() {
				// public members
				return Object.seal({
					// .seal results in 'invalid arg type' error if caller attempts to set a property that isn't defined here
					set x(newX) {
						_textEl.x = newX;
					},
					set y(newY) {
						_textEl.y = newY;
					},
					get style() {
						// c/- BarbWire; we only expose style.fill just to demonstrate restrictive API: calling code should be unable to access other style properties
						return {
							get fill() {
								return _textEl.style.fill;
							},
							set fill(color) {
								_textEl.style.fill = color;
							},
						};
					},
				});
			},
		};
	};

	const mainContainer = createTextElContainer('main');
	const mainAPI = mainContainer.API; // save this so we don't have to reconstruct the API object every time it's accessed

	const lightContainer = createOuterTextElContainer('light');
	const lightAPI = lightContainer.API; // save this so we don't have to reconstruct the API object every time it's accessed

	const shadowContainer = createOuterTextElContainer('shadow');
	const shadowAPI = shadowContainer.API; // save this so we don't have to reconstruct the API object every time it's accessed

	assignProps('main', mainAPI);
	assignProps('light', lightAPI);
	assignProps('shadow', shadowAPI);
	// to pass text and to log all text relevant data in js
	//assignProps('logText', dummyEl);

	// PRIVATE FUNCTIONS
	// Because the widget is a closure, functions declared here aren't accessible to code outside the widget.
	el.redraw = () => {
		//here text-properties get passed to all el of widget-instance
		// TODO P 0 redo to avoid extra calls to getElement
		el.getElementsByClassName('myText').forEach((e) => {
			e.text = mainContainer.textEl.text ?? 'TEXT';
			e.letterSpacing = mainContainer.textEl.letterSpacing ?? 0;
			e.style.fontFamily = mainContainer.textEl.style.fontFamily;
			e.textAnchor = mainContainer.textEl.textAnchor;
			//e.style.fontSize = dummyEl.style.fontSize ?? 30;
			//TODO check, why if set this, nothing gets displayed
			//works if mainEl.style is exposed and value set on .main.style.fontSize
			//but if set default in symbol /svg OR CSS it can't be overwritten
			//while other props CAN
		});

		// fix main at x,y of <use>
		//mainEl.x = mainEl.y = 0;  // TODO it shouldn't be necessary to do this every time anything is changed; ideally, it shouldn't be necessary to do this at all. If we don't expose mainEl.x and .y, then caller could only break it using SVG/CSS.
	};

	el.redraw();

	//INSPECT OBJECTS ***************************************************************

	//key:value pairs
	inspectObject('lightEl', lightEl);

	//prototype chain
	//dumpProperties('lightEl', lightEl, true)

	//INSPECT OBJECTS END*************************************************************

	return el;
};

constructWidgets('shadowText', construct);

/*
    TODO Exception for trying to add not exposed props
    TODO Try to run with new factory?

    TODO check, which structural functions to IIFE
    TODO prettier setting for not breaking everything into lines
    
    */

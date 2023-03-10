export const circle_pin = ({ fillColor, size = "24px" }) => `
<svg 
	aria-hidden="true" 
	focusable="false" 
	data-prefix="fas" 
	data-icon="circle" 
	class="svg-inline--fa fa-circle fa-w-16 Pin-Marker" 
	role="img" 
  width=${size}
  height=${size}
	fill=${fillColor}
	xmlns="http://www.w3.org/2000/svg" 
	viewBox="0 0 512 512">
	<path  
		d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z">
	</path>
</svg>
`;

export const encapsulated_circle_pin = ({ fillColor, size = "48px", text }) => `
<svg 
	aria-hidden="true" 
	focusable="false" 
	data-prefix="fas" 
	data-icon="circle" 
	class="svg-inline--fa fa-circle fa-w-16 Pin-Marker" 
	role="img" 
  width=${size}
  height=${size}
	fill=${fillColor}
	xmlns="http://www.w3.org/2000/svg" 
	viewBox="0 0 512 512">
	<path  
		d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z">
	</path>
	
</svg>
`;

export const map_pin = ({ fillColor, size = "24px" }) => `
<svg 
	aria-hidden="true" 
	focusable="false" 
	data-prefix="fas" 
	data-icon="map-marker-alt" 
	class="svg-inline--fa fa-map-marker-alt fa-w-12 Pin-Marker" 
	role="img"
  width=${size}
  height=${size}
	xmlns="http://www.w3.org/2000/svg" 
	fill=${fillColor}
	viewBox="0 0 384 512">
	<path 
		d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z">
	</path>
</svg>
`;

export const asterisk_pin = ({ fillColor, size = "24px" }) => `
<svg 
	aria-hidden="true" 
	focusable="false" 
	data-prefix="fas" 
	data-icon="asterisk" 
	class="svg-inline--fa fa-asterisk fa-w-16 Pin-Marker" 
	role="img" 
	xmlns="http://www.w3.org/2000/svg" 
	viewBox="0 0 512 512"
  width=${size}
  height=${size}
	fill=${fillColor}
  >
	<path 
		d="M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z">
	</path>
</svg>
`;

export const caret_pin = ({ fillColor, size = "60px" }) => `
<svg 
	aria-hidden="true" 
	focusable="false" 
	data-prefix="fas" 
	data-icon="caret-up" 
	class="svg-inline--fa fa-caret-up fa-w-10 Pin-Marker" 
	role="img" 
  width=${size}
  height=${size}
	xmlns="http://www.w3.org/2000/svg" 
	viewBox="0 0 320 512"
	fill=${fillColor}
	>
		<path 
		d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z">
		</path>
</svg>
`;

export const hyphenElement = ({ fillColor, size = "16px" }) => `
<svg 
	aria-hidden="true" 
	focusable="false" 
	data-prefix="fas" 
	width=${size}
	height=${size}
	data-icon="horizontal-rule" 
	role="img" 
	xmlns="http://www.w3.org/2000/svg" 
	viewBox="0 0 640 512" 
	class="Hyphen-svg"
	fill=${fillColor}
>
	<path 
		fill=${fillColor} 
		d="M640 239.87v31.26A15.88 15.88 0 0 1 624.14 287H15.87A15.88 15.88 0 0 1 0 271.13v-31.26A15.88 15.88 0 0 1 15.87 224h608.27A15.88 15.88 0 0 1 640 239.87z" 
		class="">
	</path>
</svg>
`;

export const anchor_pin = ({ fillColor, size = "150px" }) => `
<svg
   xmlns="http://www.w3.org/2000/svg"
   role="img"
   fill=${fillColor}
   height=${size}
   width=${size}
   viewBox="0 0 640 640" 
   version="1.0">
  <g
     id="Anchor"
       style="fill:${fillColor};stroke:none">
    <path
       d="M 127 32 C 115 32 104 42 105 54 C 105 66 115 75 127 75 C 139 75 149 66 149 54 C 149 42 139 32 127 32 z M 126 43 C 132 43 137 48 137 53 C 137 59 132 64 126 64 C 120 64 116 59 116 53 C 116 48 120 43 126 43 z " />
    <path
       d="M118.537,71.179c-1.053-0.019,0,2.075,0,9.084v9.084l-21.881-0.306   c-17.203-0.24-22.227-0.018-23.5,1.038c-2.036,1.689-2.356,13.078-0.369,13.135l44.75-0.104c0.05,10.689,0.189,21.379,0.053,32.069   c-0.504,22.08-0.892,44.162-1.097,66.247c-0.09,11.96-0.545,23.436-1.011,25.5c-1.754,7.78-6.661,8.837-21.785,4.691   c-15.729-4.312-35.264-13.896-38.552-18.913c-2.614-3.99-3.022-7.41-1.133-9.498c0.942-1.041,2.342-1.65,3.112-1.355   c0.851,0.326,1.746-0.386,2.284-1.817c1.893-5.04-4.426-12.489-16.872-19.89c-3.025-1.799-7.975-5.662-11-8.584   c-3.174-3.066-5.973-5.012-6.619-4.598c-2.009,1.287-6.12,10.584-7.383,16.697c-2.539,12.288,0.683,30.421,6.668,37.535   c3.16,3.756,4.923,3.788,5.659,0.105c1.298-6.49,9.375-4.617,18.174,4.211c6.964,6.988,20.225,17.118,26,19.862   c2.2,1.045,5.35,2.744,7,3.776c1.65,1.031,6.6,3.107,11,4.611c9.218,3.153,20.012,8.735,24.287,12.56   c1.624,1.452,4.076,3.378,5.45,4.277c2.403,1.575,2.562,1.538,4.194-0.954c3.399-5.188,9.264-9.729,18.146-14.049   c4.992-2.43,9.828-4.416,10.744-4.416c1.949,0,18.395-7.275,28.301-12.521c7.764-4.11,11.26-6.587,19.934-14.121   c9.791-8.505,14.745-9.466,19.884-3.856l3.208,3.503l2.061-2.253c3.727-4.075,5.098-8.172,5.818-17.383   c0.551-7.043,0.316-10.867-1.037-16.98c-2.142-9.658-5.73-17.913-8.414-19.35c-1.695-0.906-2.271-0.645-3.72,1.693   c-2.519,4.065-6.036,7.262-12.812,11.642c-8.113,5.244-13.01,10.649-14.516,16.026c-1.453,5.193-0.791,7.079,1.968,5.603   c3.01-1.611,4.971-1.172,6.13,1.374c1.633,3.582-0.819,6.465-10.299,12.104c-16.191,9.631-37.9,17.52-48.216,17.52   c-4.868,0-9.438-1.883-10.171-4.189c-0.353-1.112-0.371-14.237-0.04-29.166c0.331-14.93,0.866-42.664,1.189-61.633   c0.323-18.969,0.739-34.734,0.925-35.034c0.186-0.299,10.497-0.45,22.916-0.334c25.764,0.24,24.408,0.724,24.195-8.643l-0.125-5.5   c-15.387-1.079-31.138,0.942-46.46-1.126c-0.289-0.29-0.592-3.854-0.672-7.92l-0.146-9.167L118.537,71.179z" />
  </g>
</svg>
`;

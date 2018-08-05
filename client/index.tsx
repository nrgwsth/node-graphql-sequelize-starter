import * as React from "react"
import {render} from "react-dom"

class App extends React.Component {
	render(){
		return (
			<div><a href="/api/auth/twitter">Twitter</a></div>
		)
	}
}


render(<App />, document.getElementById("app"))



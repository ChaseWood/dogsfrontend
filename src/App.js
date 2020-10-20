import React from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import Display from './Display';
import Form from './Form';

function App() {
	const url = 'https://mydogsbackend.herokuapp.com';

	const [dogs, setDogs] = React.useState([]);

	// EMPTY DOG FOR FORM, THIS IS SO THE FORM IS EMPTY
	const emptyDog = {
		name: '',
		age: 0,
		img: '',
	};

	//SELECT DOG FOR USER TO SELECT A DOG TO UPDATE
	const [selectedDog, setSelectedDog] = React.useState(emptyDog);

	const getDogs = () => {
		fetch(url + '/dog/')
			.then((response) => response.json())
			.then((data) => {
				setDogs(data);
			});
	};

	// GET DOGS ON PAGE LOAD ONLY
	React.useEffect(() => getDogs(), []);

	//handleCreate FUNCTION FOR CREATING DOGS
	const handleCreate = (newDog) => {
		fetch(url + '/dog/', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newDog),
		}).then((response) => getDogs());
	};

	//handleUpdate FUNCTION TO UPDATE DOG WHEN FORM IS CLICKED
	const handleUpdate = (dog) => {
		fetch(url + '/dog/' + dog._id, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dog),
		}).then((response) => getDogs());
	};

	//selectDog WHICH SELECTS THE DOG TO UPDATE
	const selectDog = (dog) => {
		setSelectedDog(dog);
	};

	//deletedog  FUNCTION TO DELETE A DOG
	const deleteDog = (dog) => {
		fetch(url + '/dog/' + dog._id, {
			method: 'delete',
		}).then((response) => {
			getDogs();
		});
	};

	return (
		<div className='App'>
			<h1>DOG LISTING SITE</h1>
			<hr />
			<Link to='/create'>
				<button>Add Dog</button>
			</Link>
			<main>
				<Switch>
					<Route
						exact
						path='/'
						render={(rp) => (
							<Display
								{...rp}
								dogs={dogs}
								selectDog={selectDog}
								deleteDog={deleteDog}
							/>
						)}
					/>
					<Route
						exact
						path='/create'
						render={(rp) => (
							<Form
								{...rp}
								label='create'
								dog={emptyDog}
								handleSubmit={handleCreate}
							/>
						)}
					/>
					<Route
						exact
						path='/edit'
						render={(rp) => (
							<Form
								{...rp}
								label='update'
								dog={selectedDog}
								handleSubmit={handleUpdate}
							/>
						)}
					/>
				</Switch>
			</main>
		</div>
	);
}

export default App;

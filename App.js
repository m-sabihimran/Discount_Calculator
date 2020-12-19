import React, { useState } from "react";
import {	View,	Text,	StyleSheet,	TextInput,	TouchableOpacity,	Button,	ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppButton = (props) => {
	if (props.disabled != false) {
		var bkColor = "grey";
	} else {
		bkColor = "#009688";
	}

	return (
		<TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
			<View
				style={{
					backgroundColor: "white",
					height: 40,
					alignItems: "center",
					justifyContent: "center",
					padding: 2,
				}}
			>
				<Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
					{props.title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};
const HomeScreen = ({ navigation, route }) => {
	const [getPrice, setPrice] = useState();
	const [getFPrice, setFPrice] = useState();
	const [getDiscountP, setDiscountP] = useState(0);
	const [getSave, setSave] = useState();
	const [getText, setText] = useState("");
	const [getdis, setdis] = useState(true);
	const [getData, setData] = useState([
		{ OriginalPrice: 12, DiscountP: 10, FinalP: 2, key: Math.random() },
	]);

	navigation.setOptions({
		headerRight: () => (
			<Button
				title="History"
				disabled={false}
				onPress={() => navigation.navigate("History", { array: getData })}
			/>
		),
	});

	const saveRecords = () => {
		setData([
			...getData,
			{
				OriginalPrice: getPrice,
				DiscountP: getDiscountP,
				FinalP: getFPrice,
				key: getData.length + Math.random(),
			},
		]);
		setPrice(0);
		setFPrice(0);
		setDiscountP(0);
		setSave(0);
		setdis(true);
		alert("Record Added Successfully");
	};

	const disabler = () => {
		if (getPrice == "" || getPrice <= 0) {
			setdis(true);
		} else {
			setdis(false);
		}
	};

	const AppButton = (props) => {
		if (props.disabled != false) {
			var bkColor = "grey";
		} else {
			bkColor = "#009688";
		}

		return (
			<TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
				<View style={{ ...styles.saveView, backgroundColor: bkColor }}>
					<Text style={styles.appButtonText}>{props.title}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	const onChanged = (text, val) => {
		let newText = "";
		let numbers = "0123456789";
		if (val == 2 && text > 100) {
			setText("Percentage cannot be greater than 100");
		} else if (val == 2 && text <= 100) {
			setText("");
		}

		for (var i = 0; i < text.length; i++) {
			if (numbers.indexOf(text[i]) > -1) {
				newText = newText + text[i];
			} else {
				// your call back function
				alert("please enter numbers only");
			}
		}
		if (val == 1) {
			setPrice(newText);
		} else if (val == 2) {
			setDiscountP(newText);
		}
	};
	const calculator = () => {
		disabler();
		if (getPrice != 0) {
			var disc = Math.trunc((getPrice * getDiscountP) / 100);
			var final = Math.trunc(getPrice - disc);
			setFPrice(final);
			setSave(disc);
		}
		if (getPrice == 0 || getPrice == "") {
			setSave(0);
			setFPrice(0);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.headerBorder}>
				<Text style={styles.headerText}>Discount Calculator</Text>
			</View>
			<View style={styles.buttonView}>
				<TextInput
					style={styles.textField}
					placeholder="Original Price"
					keyboardType="numeric"
					onKeyPress={calculator}
					onChangeText={(text) => onChanged(text, 1)}
					value={getPrice}
				/>

				<TextInput
					style={styles.textField}
					onKeyPress={calculator}
					placeholder="Discounted Percentage"
					keyboardType="numeric"
					onChangeText={(text) => onChanged(text, 2)}
					value={getDiscountP}
				/>
				<View>
					<Text style={{ color: "red" }}>{getText}</Text>
				</View>
				<View style={styles.textResult}>
					<Text style={styles.result1}> Your Save:</Text>
					<View style={styles.result2}>
						<Text style={styles.result2Text}>{getSave}</Text>
					</View>
				</View>
				<View style={styles.textResult}>
					<Text style={styles.result1}> Final Price:</Text>
					<View style={styles.result2}>
						<Text style={styles.result2Text}>{getFPrice} </Text>
					</View>
				</View>
			</View>
			<AppButton title="Save Record" disabled={getdis} onPress={saveRecords} />
		</View>
	);
};

const History = ({ navigation, route }) => {
	const [getData, setData] = useState([...route.params.array]);
	console.log(getData);

	navigation.setOptions({
		headerRight: () => (
			<Button title="Clear all" disabled={false} onPress={() => setData([])} />
		),
	});

	const removeItem = (itemIndex) => {
		var id = itemIndex;
		for (var i = 0; i < getData.length; i++) {
			if (getData[i].key == id) {
				getData.splice(i, 1);
				break;
			}
		}
		setData([...getData]);
	};
	return (
		<View>
			<View style={styles.items}>
				<Text>Original Price</Text>
				<Text>Discount %</Text>
				<Text>Final Price</Text>
			</View>
			<ScrollView>
				{getData.map((item) => (
					<View style={styles.itemsMain}>
						<TouchableOpacity style={styles.items} key={item.key}>
							<View style={styles.items}>
								<Text style={{ fontSize: 20, color: "white" }}>
									{item.OriginalPrice}{" "}
								</Text>
								<Text style={{ fontSize: 20, color: "white" }}>
									{item.DiscountP}
								</Text>
								<Text style={{ fontSize: 20, color: "white" }}>
									{item.FinalP}
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={removeItem.bind(this, item.key)}>
							<Text
								style={{
									fontSize: 20,
									color: "black",
									width: 20,
									alignSelf: "center",
									backgroundColor: "grey",
									borderRadius: 50,
									paddingLeft: 4,
									marginLeft: 12,
									marginTop: 5,
								}}
							>
								X
							</Text>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
		</View>
	);
};

const Stack = createStackNavigator();

const App = ({ navigation }) => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ headerTitleAlign: "center" }}
				/>
				<Stack.Screen name="History" component={History} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	headerText: {
		color: "red",
		alignSelf: "center",
		fontSize: 30,
	},
	headerBorder: {
		borderBottomWidth: 1,
		borderRadius: 2,
		marginBottom: 80,
		borderColor: "grey",
	},
	container: {},
	textField: {
		borderColor: "black",
		borderWidth: 2,
		borderRadius: 10,
		height: 43,
		width: "80%",
		paddingLeft: 13,
		paddingRight: 13,
	},
	buttonView: {
		justifyContent: "space-between",
		alignItems: "center",
		height: "60%",
	},
	appButtonText: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "bold",
		alignSelf: "center",
		textTransform: "uppercase",
	},
	textResult: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "80%",
	},
	result1: {
		fontSize: 18,
	},
	result2: {
		width: 100,
		backgroundColor: "crimson",
		borderRadius: 10,
	},
	result2Text: {
		borderRadius: 10,
		backgroundColor: "crimson",
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
		alignSelf: "center",
	},
	saveView: {
		elevation: 8,
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12,
		width: "80%",
		alignSelf: "center",
		marginTop: 20,
	},
	items: {
		paddingLeft: 5,
		paddingRight: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "90%",
		height: 40,
		backgroundColor: "crimson",
		marginBottom: 1,
	},
	itemsMain: {
		flexDirection: "row",
	},
});

export default App;

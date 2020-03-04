import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoanInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false)

  const addGoalHandler = goalTitle => {
    if (goalTitle.length === 0) {
      return;
    }
    setCourseGoals(currentGoals =>
      [...currentGoals, {
        id: Math.random().toString(),
        value: goalTitle
      }]
    );
    setIsAddMode(false)
  }

  const deleteGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    })
  }

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title='Add New Goal' onPress={() => setIsAddMode(true)} />
      <GoanInput visible={isAddMode} onAddGoal={addGoalHandler} onCancelAddGoal={cancelGoalAdditionHandler} />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={
          itemData =>
            <GoalItem id={itemData.item.id} title={itemData.item.value} onDeleteGoal={deleteGoalHandler} />
        }
      />
    </View >
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});

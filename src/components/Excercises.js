import React,{useEffect, useState} from 'react';
import Pagination from '@mui/material/Pagination';
import {Box, Stack, Typography} from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';

const Excercises = ({exercises, setExercises, bodyPart}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);
  
  const Paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({top:1800, behavior:'smooth '});
  }

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if(bodyPart === 'all'){
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises ' , exerciseOptions);
      }else{
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}` , exerciseOptions);
      }
      setExercises(exercisesData);
    }
    fetchExercisesData();
  }, [bodyPart]);
  


  return (
    <Box id="exercises" mt="50px" p="20px" sx={{
      mt:{lg:'110px'}

    }}>
      <Typography variant="h3" mb="46px" id="exercise"> Showing Results</Typography>
      <Stack direction="row" flexWrap="wrap" justifyContent="center" sx={{
        gap:{lg:'110px', xs:'50px'}
      }}>
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>
      <Stack mt="100px" alignItems="center">
          {exercises.length > 9 && (
            <Pagination
            color="standard"
            defaultPage={1}
            count={Math.ceil(exercises.length/exercisesPerPage)}
            page={currentPage}
            onChange={Paginate}
            size="large"
             />
          )}
      </Stack>
    </Box>
  )
}

export default Excercises
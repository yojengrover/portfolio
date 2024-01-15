const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    const { person, day, hour } = selectedCells;
    updateSchedule(person, day, hour, getType(person, day, hour), e.target.value);
  };

  
const Dashboard = () => {
  return (
    <div className="grid grid-cols- ">
      <div className="col-span-2 grid grid-cols-5 gap-4 font-medium h-[100vh]">
        {/* sidebar */}

        <div className="col-span-4 p-4 bg-blue-50">
          <div className="p-4 bg-white rounded-lg h-[100%]">
            <h1 className="text-2xl font-bold mb-4">Contenido Principal</h1>
            {/* aqui va el contenido depende del clic en el menu sidebar */}

            {/* {selectedOption === "Cursos" && (
              <div className="flex flex-col gap-4">
                <CursoForm />
                <CardsCursos />
              </div>
            )}
            {selectedOption === "Videos" && (
              <div className="flex flex-col gap-4">
                <TablaVideos />
              </div>
            )}
            {selectedOption === "Materials" && (
              <div className="flex flex-wrap gap-4">
                <TablaMateriales />
              </div>
            )}
            {selectedOption === "Accionas" && (
              <div className="flex flex-col gap-4">
                <TablaAccionas />
              </div>
            )}
            {selectedOption === "Moduls" && (
              <div className="flex flex-col gap-4">
                <ModuloForm cursos={[]} />
                <TablaModulos cursos={[]} />
              </div>
            )}
            {selectedOption === "Quizs" && (
              <div className="flex flex-col gap-4">
                <TablaQuizs />
              </div>
            )}
            {selectedOption === "Examens" && (
              <div className="flex flex-col gap-4">
                <ModuloForm cursos={[]} />
                <TablaModulos cursos={[]} />
              </div>
            )} */}
          </div>
        </div>
      </div>

      <div className="col-span-2 p-4 bg-gray-200 mt-4">
        <p className="text-center">Pie de Página</p>
      </div>
    </div>
  );
};
export default Dashboard;

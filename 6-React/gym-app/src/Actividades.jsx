import './styles/Actividades.scss';

const activities = [
    {
        nombre: "taekwondo",
        descripcion: "Arte marcial coreana",
        horarios: [
            { dia: 2, "hora-inicio": "18:30", "hora-fin": "20:00" },
            { dia: 4, "hora-inicio": "18:30", "hora-fin": "20:00" }
        ]
    },
    {
        nombre: "zumba",
        descripcion: "ritmos latinos",
        horarios: [
            { dia: 1, "hora-inicio": "19:30", "hora-fin": "20:30" },
            { dia: 3, "hora-inicio": "19:30", "hora-fin": "20:30" }
        ]
    }
];

const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function Actividades() {
    return (
        <div className="actividades">
            <h1>Actividades</h1>

            <div className="actividades-lista">
                {activities.map((actividad, index) => (
                    <div className="activity-card" key={index}>
                        <h3>{actividad.nombre}</h3>
                        <p>{actividad.descripcion}</p>

                        <ul>
                            {actividad.horarios.map((horario, i) => (
                                <li key={i}>
                                    <strong>{diasSemana[horario.dia]}</strong>{' '}
                                    {horario["hora-inicio"]} a {horario["hora-fin"]}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Actividades;
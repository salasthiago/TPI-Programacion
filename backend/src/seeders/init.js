import Usuario from '../models/usuario.model.js';
import Producto from '../models/producto.model.js';

/**
 * Función para inicializar la base de datos con datos de ejemplo
 * Solo se ejecuta si las tablas están vacías
 */
export const inicializarDatos = async () => {
  try {
    // Verificar si ya hay datos
    const cantidadUsuarios = await Usuario.count();
    const cantidadProductos = await Producto.count();

    console.log(`📊 Estado actual: ${cantidadUsuarios} usuarios, ${cantidadProductos} productos`);

    let datosCreados = false;

    // ===== CREAR USUARIOS DE EJEMPLO =====
    if (cantidadUsuarios === 0) {
      console.log('🌱 Creando usuarios de ejemplo...');
      const usuarios = await Usuario.bulkCreate([
        {
          nombre: 'Super Admin',
          correo: 'superadmin@purplecat.com',
          password: 'admin123',
          role: 'SuperAdmin'
        },
        {
          nombre: 'Admin Usuario',
          correo: 'admin@purplecat.com',
          password: 'admin123',
          role: 'Admin'
        },
        {
          nombre: 'Usuario Demo',
          correo: 'usuario@purplecat.com',
          password: 'usuario123',
          role: 'User'
        }
      ]);

      console.log(`✅ ${usuarios.length} usuarios creados`);
      datosCreados = true;
    } else {
      console.log('ℹ️  Ya existen usuarios en la base de datos');
    }

    // ===== CREAR PRODUCTOS DE EJEMPLO =====
    if (cantidadProductos === 0) {
      console.log('🌱 Creando productos de ejemplo...');
      const productos = await Producto.bulkCreate([
      {
        name: 'Abbey Road',
        artist: 'The Beatles',
        price: 29.99,
        year: 1969,
        description: 'Undécimo álbum de estudio de The Beatles. Incluye clásicos como "Come Together" y "Here Comes the Sun".',
        stock: 15,
        genre: 'Rock',
        label: 'Apple Records',
        format: 'LP',
        condition: 'Nuevo',
        image: '/uploads/vinilos/abbey-road.jpg'
      },
      {
        name: 'Dark Side of the Moon',
        artist: 'Pink Floyd',
        price: 34.99,
        year: 1973,
        description: 'Obra maestra del rock progresivo. Uno de los álbumes más vendidos de todos los tiempos.',
        stock: 20,
        genre: 'Rock Progresivo',
        label: 'Harvest Records',
        format: 'LP',
        condition: 'Nuevo',
        image: '/uploads/vinilos/dark-side.jpg'
      },
      {
        name: 'Thriller',
        artist: 'Michael Jackson',
        price: 27.99,
        year: 1982,
        description: 'El álbum más vendido de la historia. Incluye hits como "Billie Jean" y "Beat It".',
        stock: 25,
        genre: 'Pop',
        label: 'Epic Records',
        format: 'LP',
        condition: 'Nuevo',
        image: '/uploads/vinilos/thriller.jpg'
      },
      {
        name: 'Rumours',
        artist: 'Fleetwood Mac',
        price: 31.99,
        year: 1977,
        description: 'Álbum icónico con canciones como "Dreams" y "Go Your Own Way".',
        stock: 12,
        genre: 'Rock',
        label: 'Warner Bros',
        format: 'LP',
        condition: 'Nuevo',
        image: '/uploads/vinilos/rumours.jpg'
      },
      {
        name: 'Back in Black',
        artist: 'AC/DC',
        price: 28.99,
        year: 1980,
        description: 'Uno de los álbumes de hard rock más exitosos de todos los tiempos.',
        stock: 18,
        genre: 'Hard Rock',
        label: 'Atlantic Records',
        format: 'LP',
        condition: 'Nuevo',
        image: '/uploads/vinilos/back-in-black.jpg'
      },
      {
        name: 'The Wall',
        artist: 'Pink Floyd',
        price: 45.99,
        year: 1979,
        description: 'Álbum doble conceptual. Una de las obras más ambiciosas del rock.',
        stock: 10,
        genre: 'Rock Progresivo',
        label: 'Harvest Records',
        format: '2LP',
        condition: 'Nuevo',
        image: '/uploads/vinilos/the-wall.jpg'
      },
      {
        name: 'Led Zeppelin IV',
        artist: 'Led Zeppelin',
        price: 32.99,
        year: 1971,
        description: 'Incluye "Stairway to Heaven", una de las canciones más icónicas del rock.',
        stock: 14,
        genre: 'Hard Rock',
        label: 'Atlantic Records',
        format: 'LP',
        condition: 'Nuevo',
        image: '/uploads/vinilos/led-zeppelin-iv.jpg'
      },
      {
        name: 'Nevermind',
        artist: 'Nirvana',
        price: 26.99,
        year: 1991,
        description: 'Álbum que definió el grunge de los 90. Incluye "Smells Like Teen Spirit".',
        stock: 22,
        genre: 'Grunge',
        label: 'DGC Records',
        format: 'LP',
        condition: 'Nuevo',
        image: '/uploads/vinilos/nevermind.jpg'
      },
      {
        name: 'Hotel California',
        artist: 'Eagles',
        price: 30.99,
        year: 1976,
        description: 'Álbum clásico del rock estadounidense con la icónica canción título.',
        stock: 16,
        genre: 'Rock',
        label: 'Asylum Records',
        format: 'LP',
        condition: 'Nuevo',
        image: '/uploads/vinilos/hotel-california.jpg'
      },
      {
        name: 'Born to Run',
        artist: 'Bruce Springsteen',
        price: 29.99,
        year: 1975,
        description: 'Tercer álbum de estudio de "The Boss". Rock americano en su máxima expresión.',
        stock: 11,
        genre: 'Rock',
        label: 'Columbia Records',
        format: 'LP',
        condition: 'Nuevo',
        image: '/uploads/vinilos/born-to-run.jpg'
      },
      {
        name: 'Kind of Blue',
        artist: 'Miles Davis',
        price: 33.99,
        year: 1959,
        description: 'Obra maestra del jazz modal. Uno de los álbumes de jazz más influyentes.',
        stock: 8,
        genre: 'Jazz',
        label: 'Columbia Records',
        format: 'LP',
        condition: 'Usado - Excelente',
        image: '/uploads/vinilos/kind-of-blue.jpg'
      },
      {
        name: 'Random Access Memories',
        artist: 'Daft Punk',
        price: 38.99,
        year: 2013,
        description: 'Álbum ganador del Grammy. Incluye "Get Lucky" y "Instant Crush".',
        stock: 19,
        genre: 'Electronic',
        label: 'Columbia Records',
        format: 'LP',
        condition: 'Nuevo',
        image: '/uploads/vinilos/random-access-memories.jpg'
      }
      ]);

      console.log(`✅ ${productos.length} productos creados`);
      datosCreados = true;
    } else {
      console.log('ℹ️  Ya existen productos en la base de datos');
    }

    if (datosCreados) {
      console.log('🎉 Base de datos inicializada correctamente');
      console.log('\n📝 Usuarios de prueba:');
      console.log('   SuperAdmin: superadmin@purplecat.com / admin123');
      console.log('   Admin: admin@purplecat.com / admin123');
      console.log('   User: usuario@purplecat.com / usuario123');
    }

  } catch (error) {
    console.error('❌ Error al inicializar datos:', error);
    throw error;
  }
};


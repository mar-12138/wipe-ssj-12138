//包装函数
module.exports = function(grunt){
    //任务配置，所有插件的配置信息
    grunt.initConfig({

        //获取package.json的信息
        pkg: grunt.file.readJSON('package.json'),
		
		// 第一步配置uglify插件的信息
        uglify:{
            options:{
                banner:'/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            build:{
                src:'src/*.js',
                dest:'dist/<%=pkg.name%>-<%= pkg.version %>.min.js'
            }
        },
		
		// jshint的插件配置信息
        jshint:{
            build:['src/*.js'],
            options:{
                jshintrc:'.jshintrc' //检测JS代码错误要根据此文件的设置规范进行检测，可以自己修改规则
            }
        },
		
		
		// clean插件配置信息
		clean:{
			contents:['dist/*'],
		},
		
		// copy插件配置信息
		copy:{
			main:{
			files:[
				{expand: true, cwd: 'dist/', src: ['**'], dest: 'sample/js/'},
			]
			}
		},
		
		// replace插件配置信息
		replace: {
		  another_example: {
		    src: ['sample/demo.html'],
		    overwrite: true,                 // overwrite matched source files
		    replacements: [{
		      from: /(-\d+)\.(\d+)\.\d+/g,
		      to: "-<%= pkg.version %>"
		    }]
		  }
		}
    });
	
	// 使用插件第二步：加载插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-text-replace');
    //告诉grunt当我们在终端中输入grunt时需要做些什么（注意先后顺序）
	grunt.registerTask('default', ['clean','uglify','copy','replace']);
	// grunt.registerTask('default', ['jshint','uglify']);
};
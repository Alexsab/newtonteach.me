# newtonteach.me
 
## для того чтобы запустить тестовую версию  

нужно в файле **Gemfile** закоментировать строку ```gem "github-pages"```  
и раскоментировать ```gem "jekyll"```  
затем запустить (чтобы обновить gem-ы):  
```bash
bundle update
```  

для запуска сайта запустить:  

```bash
bundle exec jekyll browsersync --port=4001
```

## для заливки в github

проделать процедуру обратную предыдущей  
нужно в файле **Gemfile** закоментировать строку ```gem "jekyll"```  
и раскоментировать ```gem "github-pages"```  
затем запустить (чтобы обновить gem-ы):  
```bash
bundle update
```  
и можно комитить

## Внимание

если видите много изменений в Gemfile.lock, то значит вы используете тестовую сборку. Не добавляйте файлы Gemfile и Gemfile.lock к коммиту
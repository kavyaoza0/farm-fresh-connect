import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { languages, Language } from '@/i18n/translations';
import { Check, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export const LanguageSelector = () => {
  const { 
    language, 
    setLanguage, 
    showLanguageSelector, 
    setShowLanguageSelector,
    isFirstVisit,
    setFirstVisitComplete,
    t 
  } = useLanguage();

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
  };

  const handleConfirm = () => {
    if (isFirstVisit) {
      setFirstVisitComplete();
    } else {
      setShowLanguageSelector(false);
    }
  };

  return (
    <Dialog open={showLanguageSelector} onOpenChange={setShowLanguageSelector}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            {t.selectLanguage}
          </DialogTitle>
        </DialogHeader>
        
        <p className="text-sm text-muted-foreground mb-4">
          {t.choosePreferredLanguage}
        </p>

        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg border transition-all text-left",
                language === lang.code
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <div>
                <p className="font-medium text-foreground">{lang.nativeName}</p>
                <p className="text-xs text-muted-foreground">{lang.name}</p>
              </div>
              {language === lang.code && (
                <Check className="w-5 h-5 text-primary" />
              )}
            </button>
          ))}
        </div>

        <Button onClick={handleConfirm} className="w-full mt-4">
          {t.confirm}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
